# dressMio iOS Release Handoff

**Last updated:** 2026-08-30
**App Store version:** 1.0.0
**iOS bundle identifier:** `com.dressmio.app`
**App Store Connect app ID:** `6771671395`
**Purpose:** Track the Apple permission-string correction, the August 30 App Review fixes, preflight verification, and the remaining release steps.

## Submission failure diagnosed

The iOS build completed, but the TestFlight submission failed because the IPA used `space.manus.smart.closet.app.t20260222214737`. App Store Connect has no application record for that identifier under app ID `6771671395`. The registered identifier is `com.dressmio.app`, and `app.config.ts` now sets that value for iOS while leaving the Android package identifier unchanged. A new IPA must be built after this identity correction; the previously completed IPA cannot be repaired by changing source configuration.

## Apple review fix

Apple requested that the camera and photo-library purpose strings explain how dressMio uses the requested information and include a specific example. The current `app.config.ts` satisfies that request in the native `ios.infoPlist` configuration.

| Permission key | Current explanation and example |
|---|---|
| `NSCameraUsageDescription` | dressMio uses the camera to photograph clothing items; a shirt photo is analyzed for item type, color, and style. |
| `NSPhotoLibraryUsageDescription` | dressMio lets the user select existing clothing photos; for example, jeans can be selected and added to the wardrobe for outfit planning. |
| `NSPhotoLibraryAddUsageDescription` | dressMio saves outfit photos so the user can share them or keep them for reference. |

These strings are embedded in the iOS binary at build time. A new binary must be generated after the configuration change; changing the source after an IPA has been built does not change that IPA.

## August 30 App Review rejection and fixes

Apple reviewed Version 1.0 build `10011` on an iPad Air 11-inch (M3) and identified two additional issues:

1. The iOS binary declared `audio` in `UIBackgroundModes`, although dressMio has no persistent background-audio feature.
2. The App Store Support URL was the temporary Manus URL `https://8888-io9m9piuz4tpigf7yijmw-e0c38688.us1.manus.computer`, which was not functional for reviewers.

The release configuration now removes the unused `expo-audio` and `expo-video` plugins and dependencies. In particular, the prior `expo-video` setting `supportsBackgroundPlayback: true` has been removed. The app contains no imports of either package, so no user-facing audio feature was removed.

A GitHub Pages support site is being prepared at:

`https://navm3011.github.io/dressmio/support.html`

Do not update App Store Connect until the repository changes have been pushed and the URL has been verified in a private browser window. Then update App Store Connect → **Distribution → iOS App → Version 1.0 → App Information → Support URL** with that address.

The corrected binary should be marketing version `1.0.0` with a new unique build number such as `10012`; the marketing version remains `1.0.0`. The user has reported that build `10012` was already created and submitted, so verify that existing binary before creating any further build.

## Verified in the sandbox

The following checks passed against the current repository state:

| Check | Result |
|---|---|
| `pnpm install --frozen-lockfile` | Passed |
| `pnpm exec tsc --noEmit` | Passed with 0 errors |
| Full Vitest suite | Passed |
| `pnpm exec expo config --json` | Passed; resolved version is `1.0.0` and all three permission strings are present |
| `pnpm exec expo export --platform ios --output-dir /tmp/dressmio-ios-export` | Passed; the iOS JavaScript bundle was generated successfully |
| Android JavaScript export | Passed before the iOS-only rejection fix |
| Support page preview | Served HTTP 200 from `/support.html` |
| Background audio config check | No `UIBackgroundModes` or `supportsBackgroundPlayback` setting remains in the release config |

A native iOS archive was not run in the sandbox because it requires macOS and Xcode. The local Mac build remains the final native verification step.

## Build-number rule for the resubmission

The previously uploaded build `1.0.10 (10010)` was not eligible for the existing App Store version 1.0 because its marketing version was wrong. Build `1.0.0 (10011)` corrected the permission strings but was rejected for the separate background-audio and Support URL issues. The next corrected build must use marketing version `1.0.0` and a new unique iOS build number `10012` or higher. The marketing version and build number are separate identifiers; do not derive a marketing version from the build number.

## Local Mac release procedure

From the project directory, install exactly from the lockfile and repeat the preflight:

```bash
corepack enable
corepack prepare pnpm@9.12.0 --activate
rm -rf node_modules
pnpm install --frozen-lockfile
pnpm exec tsc --noEmit
pnpm exec expo config --json
pnpm exec expo export --platform ios --output-dir /tmp/dressmio-ios-export
```

Because the iOS rejection fix changes native configuration and local Xcode may be older than the React Native toolchain, create the next signed IPA with an EAS cloud build. Do not use `--auto-submit` until the IPA has been verified:

```bash
npx --yes eas-cli@latest build \
  --platform ios \
  --profile production
```

If the build succeeds, locate the artifact with:

```bash
find build-artifacts . -type f -name '*.ipa' -print
```

## TestFlight status

A completed local or remote EAS build means that an IPA was generated. It does **not** by itself mean that the binary was uploaded to App Store Connect or made available in TestFlight.

TestFlight upload requires a separate submission step. Upload the verified IPA through Xcode Organizer or Apple Transporter, or run the EAS submit command from the Mac after confirming that the build exists:

```bash
npx --yes eas-cli@latest submit --platform ios --latest --profile production
```

After uploading, open App Store Connect → **My Apps** → **dressMio** → **TestFlight**. Wait for Apple processing to finish, then add internal testers and install the build through the TestFlight app. The build is not ready for tester installation while its status is still processing or invalid.

## Current status to confirm on the Mac

Build `1.0.0 (10011)` was uploaded and reviewed by Apple on August 30, 2026. Apple rejected it because of the unused iOS background-audio declaration and the nonfunctional Support URL. Build `1.0.0 (10012)` was subsequently reported as created and submitted; confirm its processing status and ensure Version 1.0 is attached to build 10012 before resubmitting.

## References

1. [Expo: Local builds](https://docs.expo.dev/build-reference/local-builds/)
2. [Expo: Permissions](https://docs.expo.dev/guides/permissions/)
3. [Apple: App Store Connect Help](https://developer.apple.com/help/app-store-connect/)
