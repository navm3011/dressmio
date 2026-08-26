# dressMio iOS Release Handoff

**Last updated:** 2026-08-26
**App Store version:** 1.0.8
**iOS bundle identifier:** `com.dressmio.app`
**App Store Connect app ID:** `6771671395`
**Purpose:** Track the Apple permission-string correction, preflight verification, and the remaining local release steps.

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

## Verified in the sandbox

The following checks passed against the current repository state:

| Check | Result |
|---|---|
| `pnpm install --frozen-lockfile` | Passed |
| `pnpm exec tsc --noEmit` | Passed with 0 errors |
| Full Vitest suite | Passed |
| `pnpm exec expo config --json` | Passed; resolved version is `1.0.8` and all three permission strings are present |
| `pnpm exec expo export --platform ios --output-dir /tmp/dressmio-ios-export --clear` | Passed; the iOS JavaScript bundle was generated successfully |

A native iOS archive was not run in the sandbox because it requires macOS and Xcode. The local Mac build remains the final native verification step.

## Build-number rule for the resubmission

The successful corrected build is marketing version `1.0.8`. Keep the App Store marketing version at `1.0.8` for this release. Increase `ios.buildNumber` to a value higher than the last uploaded 1.0.8 build. The marketing version and build number are separate identifiers; do not infer the build number from `1.0.8`.

## Local Mac release procedure

From the project directory, install exactly from the lockfile and repeat the preflight:

```bash
corepack enable
corepack prepare pnpm@9.12.0 --activate
rm -rf node_modules
pnpm install --frozen-lockfile
pnpm exec tsc --noEmit
pnpm exec expo config --json
pnpm exec expo export --platform ios --output-dir /tmp/dressmio-ios-export --clear
```

Then create the signed IPA locally. Do not use `--auto-submit` on the first attempt; verify the IPA before uploading it:

```bash
mkdir -p build-artifacts
EAS_LOCAL_BUILD_ARTIFACTS_DIR="$PWD/build-artifacts" \
EAS_LOCAL_BUILD_SKIP_CLEANUP=1 \
npx --yes eas-cli@latest build \
  --platform ios \
  --profile production \
  --local
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

At the time this document was written, the completed build had not been uploaded to TestFlight: the EAS submission failed with App Store Connect error `-19000` because the IPA used the wrong bundle identifier. After rebuilding with `com.dressmio.app`, confirm the new upload in App Store Connect.

## References

1. [Expo: Local builds](https://docs.expo.dev/build-reference/local-builds/)
2. [Expo: Permissions](https://docs.expo.dev/guides/permissions/)
3. [Apple: App Store Connect Help](https://developer.apple.com/help/app-store-connect/)
