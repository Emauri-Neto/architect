use tauri::command;

const ORIGINS: &'static str = include_str!("origins.json");

#[command]
pub fn get_origins() -> serde_json::Value {
    serde_json::from_str(ORIGINS).unwrap_or(serde_json::Value::Null)
}
