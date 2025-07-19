# TamiaDisk

<br>

<p align="center">
    <a href="#"><img src="https://img.shields.io/github/v/release/boute95/tamiadisk?color=%23ff00a0&include_prereleases&label=version&sort=semver&style=flat-square"></a>
     &nbsp;
      <a href="#"><img src="https://shields.io/badge/-ALPHA-orange?color=%23ff00a0&include_prereleases&label=status&sort=semver&style=flat-square"></a>
    &nbsp;
    <a href="#"><img src="https://img.shields.io/badge/built_with-Rust-dca282.svg?style=flat-square"></a>
     &nbsp;
</p>

<div align="center">

[![Windows Support](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)](#) [![Ubuntu Support](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)](#) [![Windows Support](https://img.shields.io/badge/MACOS-adb8c5?style=for-the-badge&logo=macos&logoColor=white)](#)

</div>

![Screenshot](/public/tamiadisk-demo.gif)

## What's taking your hard disk space?

TamiaDisk is a fork of SquirrelDisk. It's A lightweight open source tool for visualizing disk usage. It's built with Rust and React using Tauri.

It's an open source and multi-platform alternative to softwares like: WinDirStat, WizTree, TreeSize and DaisyDisk.

The current intent of this fork is to change the Pie chart from SquirrelDisk to a Tree Map.

Some features:

- Fast scan and deep directory scanning
- Disk scanning or pick a directory
- External disks real-time detection
- A Tree Map chart to quickly visualize the disk usage
- Cross-Platform MacOS, Windows, Linux
- ~~(WIP)Drag and drop: collect all items to be deleted~~
- ~~(WIP)Right click on a folder/file to open the file explorer~~
- ~~(WIP)Auto-updater: get notified when there is a new update (only on app launch - no notification spamming thanks)~~

## Installation

No release build yet. Please build it manually.

~~Please note that the current version is not 100% stable yet, and you may encounter bugs.~~

~~### Windows~~

~~1. Download the installer from the [release page](#)~~
~~2. The binary is not signed so Windows could open a popup window warning you that the file is unsecure, just click on "More Information" > "Run Anyway"~~

~~[Why the binary isn't Codesigned and marked as unsafe?](https://news.ycombinator.com/item?id=19330062)~~

~~### Ubuntu~~

~~1. Download the .deb package from the [release page](#)~~
~~2. Install~~

~~### MacOS~~

~~1. Download the .dmg from the [release page](#)~~
~~2. Install the app from the .dmg~~
~~3. First time you open the App: `Right click > Open` once (it won't run, since the binaries are not signed an alert will appear), then do it again `Right click > Open` to bypass the issue, it won't happen again after the first time.~~

## Bug Reporting

If you find any bugs, please report it by submitting an issue on our [issue page](#) with a detailed explanation. Giving some screenshots would also be very helpful.

## Feature Request

You can also submit a feature request on our [issue page](#) or [discussions](#) and we will try to implement it as soon as possible.

## Credits

- [Fork of SquirrelDisk](https://github.com/adileo/squirrel-disk)
- [parallel-disk-usage](https://github.com/KSXGitHub/parallel-disk-usage)
- [tauri](https://github.com/tauri-apps/tauri)
