export const authEndpoint = "https://accounts.spotify.com/authorize";

// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = "6169b281e6274a7bb4bed7d9407887e5";
export const redirectUri = "http://localhost:3000/overview";
export const scopes = [
    "user-top-read",
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-read-email"
];
