/**
 * withObjcAppDelegate.js
 *
 * Expo SDK 50+ generates a Swift AppDelegate by default, but
 * @react-native-firebase/app v17 can only inject its initialization code
 * into Objective-C delegates. This plugin runs BEFORE the Firebase plugin
 * and converts the generated AppDelegate to ObjC++ so Firebase can inject
 * properly.
 *
 * Must appear in app.json plugins list BEFORE "@react-native-firebase/app".
 */
const { withAppDelegate } = require('@expo/config-plugins');

const OBJC_APP_DELEGATE = `\
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
  return withAppDelegate(config, (config) => {
    if (config.modResults.language === 'swift') {
      // Switch to ObjC++ so @react-native-firebase/app can inject Firebase init
      config.modResults.language = 'objcpp';
      config.modResults.contents = OBJC_APP_DELEGATE;
    }
    return config;
  });
};
