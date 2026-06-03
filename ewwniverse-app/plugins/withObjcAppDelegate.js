/**
 * withObjcAppDelegate.js
 *
 * Expo SDK 50+ generates a Swift AppDelegate by default, but
 * @react-native-firebase/app v17 can only inject its initialization code
 * into an Objective-C delegate.
 *
 * This plugin uses withDangerousMod to convert AppDelegate.swift →
 * AppDelegate.mm on disk BEFORE the Firebase dangerous-mod callback reads
 * the file. It MUST appear AFTER "@react-native-firebase/app" in the
 * app.json plugins array — the dangerous-mod pipeline is LIFO, so the
 * last-registered callback executes first.
 */
const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const OBJC_APP_DELEGATE_H = `\
#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>

@interface AppDelegate : RCTAppDelegate
@end
`;

const OBJC_APP_DELEGATE_MM = `\
#import "AppDelegate.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"main";
  self.initialProps = @{};
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

@end
`;

module.exports = function withObjcAppDelegate(config) {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const iosDir = path.join(config.modRequest.projectRoot, 'ios');

      // The AppDelegate lives in a subdirectory named after the app
      let swiftPath = null;
      for (const entry of fs.readdirSync(iosDir, { withFileTypes: true })) {
        if (!entry.isDirectory()) continue;
        const candidate = path.join(iosDir, entry.name, 'AppDelegate.swift');
        if (fs.existsSync(candidate)) {
          swiftPath = candidate;
          break;
        }
      }

      if (!swiftPath) return config; // already ObjC or not found — nothing to do

      const dir = path.dirname(swiftPath);
      const mmPath = path.join(dir, 'AppDelegate.mm');
      const hPath  = path.join(dir, 'AppDelegate.h');

      // Write ObjC files
      fs.writeFileSync(mmPath, OBJC_APP_DELEGATE_MM, 'utf8');
      if (!fs.existsSync(hPath)) {
        fs.writeFileSync(hPath, OBJC_APP_DELEGATE_H, 'utf8');
      }

      // Remove the Swift file so Firebase doesn't find it
      fs.unlinkSync(swiftPath);

      return config;
    },
  ]);
};
