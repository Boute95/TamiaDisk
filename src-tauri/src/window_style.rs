// Copyright 2020-2022 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

//! Add native shadows to your windows.
//!
//! ## Platform-specific
//!
//! - **Windows**: On Windows 11, the window will also have rounded corners.
//! - **macOS**: Shadows are always disabled for transparent windows.
//! - **Linux**: Unsupported, Shadows are controlled by the compositor installed on the end-user system.
//!
//! # Example
//!
//! ```no_run
//! use window_shadows::set_shadow;
//!
//! # let window: &dyn raw_window_handle::HasRawWindowHandle = unsafe { std::mem::zeroed() };
//! #[cfg(any(windows, target_os = "macos"))]
//! set_shadow(&window, true).unwrap();
//! ```

/// Enables or disables the shadows for a window.
///
/// ## Platform-specific
///
/// - **Windows**: On Windows 11, the window will also have rounded corners.
/// - **macOS**: Shadows are always disabled for transparent windows.
/// - **Linux**: Unsupported, Shadows are controlled by the compositor installed on the end-user system.
pub fn set_window_styles(window: &tauri::WebviewWindow) -> Result<(), Error> {
    use raw_window_handle::HasWindowHandle;
    let raw_handle = window
        .window_handle()
        .map(|h| h.as_raw())
        .map_err(|_| Error::UnsupportedPlatform)?;
    match raw_handle {
        #[cfg(target_os = "macos")]
        raw_window_handle::RawWindowHandle::AppKit(handle) => {
            use cocoa::base::id;
            use objc::{msg_send, runtime::YES};

            unsafe {
                let ns_window: id = msg_send![handle.ns_view as id, window];
                ns_window.setHasShadow_(YES);
            }

            Ok(())
        }
        #[cfg(target_os = "windows")]
        raw_window_handle::RawWindowHandle::Win32(handle) => {
            use windows_sys::Win32::{
                Foundation::COLORREF, Graphics::Dwm::DwmSetWindowAttribute,
                Graphics::Dwm::DWMWA_BORDER_COLOR, Graphics::Dwm::DWMWA_WINDOW_CORNER_PREFERENCE,
                Graphics::Dwm::DWMWCP_ROUND,
            };

            let hwnd = isize::from(handle.hwnd);
            unsafe {
                DwmSetWindowAttribute(
                    hwnd,
                    DWMWA_WINDOW_CORNER_PREFERENCE,
                    &DWMWCP_ROUND as *const i32 as *const _,
                    std::mem::size_of::<i32>() as _,
                );

                let dark_color: COLORREF = 0x280606;
                DwmSetWindowAttribute(
                    hwnd,
                    DWMWA_BORDER_COLOR,
                    &dark_color as *const COLORREF as *const _,
                    std::mem::size_of::<COLORREF>() as _,
                );
            };
            Ok(())
        }
        _ => Err(Error::UnsupportedPlatform),
    }
}

#[derive(Debug)]
pub enum Error {
    UnsupportedPlatform,
}

impl std::fmt::Display for Error {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "\"set_shadow()\" is only supported on Windows and macOS")
    }
}
