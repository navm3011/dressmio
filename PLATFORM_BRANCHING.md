# Platform Branching Policy

This repository uses separate release branches to protect submitted builds.

## Branch ownership

- **`main` is the iOS release branch.** Keep the submitted iOS release configuration here, including the App Store bundle identifier, iOS build settings, permission strings, and iOS release documentation. Do not make Android-only changes directly on `main`.
- **`android-release` is the Android-only release branch.** Use this branch for Android package configuration, Android version codes, Android permissions, Google Play metadata, and Android testing/build work. Do not change the submitted iOS build or iOS release settings from this branch.

## Safety rules

1. Start Android work from `android-release`:
   ```bash
   git switch android-release
   ```
2. Before committing, confirm the current branch:
   ```bash
   git branch --show-current
   ```
3. Android changes must be committed and pushed to `android-release`, not `main`.
4. The submitted iOS build remains version `1.0.0` / build `10012`; do not increment or rebuild it for Android-only work.
5. If a shared file must change for Android, review the diff carefully and confirm that iOS values remain unchanged before committing.

The two branches intentionally share a common starting point, but their release work is maintained independently.
