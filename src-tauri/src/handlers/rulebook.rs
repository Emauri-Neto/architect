use tauri::command;

const ORIGINS: &'static str = include_str!("origins.json");
const CLASSES: &'static str = include_str!("classes.json");

#[command]
pub fn get_origins() -> serde_json::Value {
    serde_json::from_str(ORIGINS).unwrap_or(serde_json::Value::Null)
}

#[command]
pub fn get_classes() -> serde_json::Value {
    serde_json::from_str(CLASSES).unwrap_or(serde_json::Value::Null)
}
