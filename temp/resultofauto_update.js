[
  {
    "Auto-update settings.": {
      updateDisabled: false,
      rebootAfterUpdate: false,
      autoUpdateAllowedConnectionType:
        "AUTO_UPDATE_CONNECTION_TYPE_ENUM_WIFI_AND_ETHERNET",
      autoUpdateRolloutPlan: {
        plan: "DEFAULT_UPDATES",
      },
      autoUpdateTimeRestrictions: {
        timeRestriction: [
          {
            start: {
              dayOfWeek: "TUESDAY",
              hours: "2",
              minutes: "30",
            },
            end: {
              dayOfWeek: "WEDNESDAY",
              hours: "21",
              minutes: "15",
            },
          },
        ],
      },
      autoUpdateHttpDownloadsEnabled: false,
      releaseChannelWithLts: "RELEASE_CHANNEL_WITH_LTS_ENUM_STABLE_CHANNEL",
      deviceAutoUpdatePeerToPeerEnabled: true,
    },
    "Extended auto-updates.": {
      deviceExtendedAutoUpdateEnabled: false,
    },
    "App-controlled updates.": {},
    "Scheduled updates.": {
      wilcoScheduledUpdateEnabled: false,
    },
    "Variations.": {
      deviceVariationsEnabled: "DEVICE_VARIATIONS_LEVEL_ENUM_ENABLED",
    },
  },
];
