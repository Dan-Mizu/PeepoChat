// prevents additional console windows on Windows OS
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// error handling
use std::error::Error;

// tauri state management
use std::sync::Mutex;
use tauri::State;

// twitch API
use twitch_api::{twitch_oauth2::*, TwitchClient};

// define twitch client and token
struct Twitch {
    client: Mutex<TwitchClient<'static, reqwest::Client>>,
    token: Mutex<AppAccessToken>,
}

// initialize twitch client and token
#[tokio::main]
async fn init_twitch() -> Result<Twitch, Box<dyn std::error::Error + Send + Sync + 'static>> {
    // create client
    let client: TwitchClient<'_, reqwest::Client> = TwitchClient::new();

    // get environment variables/twitch client id and secret
    let _ = dotenvy::dotenv();
    let client_id: ClientId = std::env::var("TWITCH_CLIENT_ID")
        .ok()
        .map(ClientId::new)
        .expect("Missing TWITCH_CLIENT_ID env variable");
    let client_secret: ClientSecret = std::env::var("TWITCH_CLIENT_SECRET")
        .ok()
        .map(ClientSecret::new)
        .expect("Missing TWITCH_CLIENT_SECRET env variable");

    // get token
    let token: AppAccessToken =
        AppAccessToken::get_app_access_token(&client, client_id, client_secret, Scope::all())
            .await
            .unwrap();

    Ok(Twitch {
        client: client.into(),
        token: token.into(),
    })
}

// get twitch user from username
#[tokio::main]
async fn query_twitch_user(
    username: String,
    twitch: State<Twitch>,
) -> Result<twitch_api::helix::users::User, Box<dyn std::error::Error + Send + Sync + 'static>> {
    // get client
    let client: std::sync::MutexGuard<'_, TwitchClient<'_, reqwest::Client>> =
        twitch.client.lock().unwrap();

    // get token
    let token: AppAccessToken = twitch.token.lock().unwrap().to_owned();

    // get user data from username
    Ok(client
        .helix
        .get_user_from_login(&username, &token)
        .await?
        .expect("no user found"))
}

// get twitch channel from id
#[tokio::main]
async fn query_twitch_channel(
    user_id: String,
    twitch: State<Twitch>,
) -> Result<
    twitch_api::helix::channels::ChannelInformation,
    Box<dyn std::error::Error + Send + Sync + 'static>,
> {
    // get client
    let client: std::sync::MutexGuard<'_, TwitchClient<'_, reqwest::Client>> =
        twitch.client.lock().unwrap();

    // get token
    let token: AppAccessToken = twitch.token.lock().unwrap().to_owned();

    // get channel from user ID
    Ok(client
        .helix
        .get_channel_from_id(
            &[twitch_api::types::UserIdRef::from_str(&user_id)][0].to_owned(),
            &token,
        )
        .await?
        .expect("no channel found"))
}

// tauri commands (https://tauri.app/v1/guides/features/command)
#[tauri::command]
fn get_twitch_user(username: String, twitch: State<Twitch>) -> twitch_api::helix::users::User {
    // get response
    let response: Result<twitch_api::helix::users::User, Box<dyn Error + Send + Sync>> =
        query_twitch_user(username, twitch);

    // check response
    if let Err(ref err) = response {
        println!("Error: {err}");
        let mut e: &'_ dyn Error = err.as_ref();
        while let Some(cause) = e.source() {
            println!("Caused by: {cause}");
            e = cause;
        }
    }

    // return response
    response.unwrap()
}

#[tauri::command]
fn get_twitch_channel(
    user_id: String,
    twitch: State<Twitch>,
) -> twitch_api::helix::channels::ChannelInformation {
    // get response
    let response: Result<
        twitch_api::helix::channels::ChannelInformation,
        Box<dyn Error + Send + Sync>,
    > = query_twitch_channel(user_id, twitch);

    // check response
    if let Err(ref err) = response {
        println!("Error: {err}");
        let mut e: &'_ dyn Error = err.as_ref();
        while let Some(cause) = e.source() {
            println!("Caused by: {cause}");
            e = cause;
        }
    }

    // return response
    response.unwrap()
}

// builds tauri and registers commands
fn main() {
    // build tauri and register commands
    tauri::Builder::default()
        .manage(init_twitch().unwrap())
        .invoke_handler(tauri::generate_handler![
            get_twitch_user,
            get_twitch_channel
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
