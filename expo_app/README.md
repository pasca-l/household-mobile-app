## Check dependencies required by Expo
1. Find issues in the Expo project.
```
$ npx expo-doctor
```

## Deploy to Expo Updates
1. Login to Expo account.
```
$ eas login
```

2. Build and deploy to Expo Updates (without Git version control).
```
$ export EAS_NO_VCS=1
$ eas update
```

## Deploy Firebase settings (Firestore rules and indexes)
1. Login to Firebase account.
```
$ firebase login
```

2. Deploy Firebase settings.
```
$ firestore deploy
```
