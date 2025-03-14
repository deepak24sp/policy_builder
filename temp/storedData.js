[
    {
        "section": "updateDisabled",
        "field": "updateDisabled",
        "description": "Allow devices to automatically update OS version. Controls whether managed ChromeOS devices install updates.",
        "type": "TYPE_BOOL",
        "label": "LABEL_OPTIONAL",
        "defaultValue": false,
        "knownValueDescriptions": [
            {
                "value": "true",
                "description": "Block updates."
            },
            {
                "value": "false",
                "description": "Allow updates."
            }
        ],
        "nestedFields": [],
        "fieldDependencies": [],
        "isActive": true
    },
    {
        "section": "rebootAfterUpdate",
        "field": "rebootAfterUpdate",
        "description": "Auto reboot after updates. Controls whether a managed ChromeOS device reboots after it is updated.",
        "type": "TYPE_BOOL",
        "label": "LABEL_OPTIONAL",
        "defaultValue": false,
        "knownValueDescriptions": [
            {
                "value": "true",
                "description": "Allow auto-reboots."
            },
            {
                "value": "false",
                "description": "Disallow auto-reboots."
            }
        ],
        "nestedFields": [],
        "fieldDependencies": [],
        "isActive": true
    },
    {
        "section": "autoUpdateAllowedConnectionType",
        "field": "autoUpdateAllowedConnectionType",
        "description": "Updates over cellular. Controls whether a managed ChromeOS device updates over Wi-Fi and Ethernet only or using any connection type, including cellular.",
        "type": "TYPE_ENUM",
        "label": "LABEL_OPTIONAL",
        "defaultValue": "AUTO_UPDATE_CONNECTION_TYPE_ENUM_WIFI_AND_ETHERNET",
        "knownValueDescriptions": [
            {
                "value": "AUTO_UPDATE_CONNECTION_TYPE_ENUM_WIFI_AND_ETHERNET",
                "description": "Allow automatic updates over Wi-Fi and Ethernet only."
            },
            {
                "value": "AUTO_UPDATE_CONNECTION_TYPE_ENUM_ALL_CONNECTIONS",
                "description": "Allow automatic updates on all connections, including cellular."
            }
        ],
        "nestedFields": [],
        "fieldDependencies": [],
        "isActive": true
    },
    {
        "section": "deviceRollbackToTargetVersion",
        "field": "deviceRollbackToTargetVersion",
        "description": "Roll back to target version. To use a previous version, devices will need to be restarted. Devices will be wiped and all local data will be lost. Learn more about rolling back devices here: https://support.google.com/chrome/a?p=rollback.",
        "type": "TYPE_ENUM",
        "label": "LABEL_OPTIONAL",
        "defaultValue": "ROLLBACK_TO_TARGET_VERSION_ENUM_ROLLBACK_DISABLED",
        "knownValueDescriptions": [
            {
                "value": "ROLLBACK_TO_TARGET_VERSION_ENUM_ROLLBACK_DISABLED",
                "description": "Do not roll back OS."
            },
            {
                "value": "ROLLBACK_TO_TARGET_VERSION_ENUM_ROLLBACK_AND_RESTORE_IF_POSSIBLE",
                "description": "Roll back OS."
            }
        ],
        "nestedFields": [],
        "fieldDependencies": [
            {
                "sourceField": "updateDisabled",
                "sourceFieldValue": "false"
            }
        ],
        "isActive": false
    },
    {
        "section": "autoUpdateRolloutPlan",
        "field": "autoUpdateRolloutPlan",
        "description": "Allows the admin to specify a timed rollout plan for automatic updates.",
        "type": "TYPE_MESSAGE",
        "label": "LABEL_OPTIONAL",
        "knownValueDescriptions": [],
        "nestedFields": [
            {
                "section": "autoUpdateRolloutPlan.plan",
                "field": "plan",
                "description": "Update rollout plan.",
                "type": "TYPE_ENUM",
                "label": "LABEL_OPTIONAL",
                "defaultValue": "DEFAULT_UPDATES",
                "knownValueDescriptions": [
                    {
                        "value": "DEFAULT_UPDATES",
                        "description": "Default (devices should update as soon as a new version is available)."
                    },
                    {
                        "value": "SCHEDULE_UPDATES",
                        "description": "Roll out updates over a specific schedule."
                    },
                    {
                        "value": "SCATTER_UPDATES",
                        "description": "Scatter updates."
                    }
                ],
                "fieldDependencies": [],
                "nestedFields": [],
                "isActive": true
            },
            {
                "section": "autoUpdateRolloutPlan.stages",
                "field": "stages",
                "description": "Rollout stages.",
                "type": "TYPE_MESSAGE",
                "label": "LABEL_REPEATED",
                "knownValueDescriptions": [],
                "fieldDependencies": [
                    {
                        "sourceField": "plan",
                        "sourceFieldValue": "SCHEDULE_UPDATES"
                    }
                ],
                "nestedFields": [
                    {
                        "section": "autoUpdateRolloutPlan.stages.days",
                        "field": "days",
                        "description": "Days.",
                        "type": "TYPE_INT32",
                        "label": "LABEL_OPTIONAL",
                        "knownValueDescriptions": [],
                        "fieldDependencies": [],
                        "nestedFields": [],
                        "isActive": true
                    },
                    {
                        "section": "autoUpdateRolloutPlan.stages.percentage",
                        "field": "percentage",
                        "description": "Percentage.",
                        "type": "TYPE_INT32",
                        "label": "LABEL_OPTIONAL",
                        "knownValueDescriptions": [],
                        "fieldDependencies": [],
                        "nestedFields": [],
                        "isActive": true
                    }
                ],
                "isActive": false
            },
            {
                "section": "autoUpdateRolloutPlan.scatter",
                "field": "scatter",
                "description": "Scatter Factor.",
                "type": "TYPE_ENUM",
                "label": "LABEL_OPTIONAL",
                "knownValueDescriptions": [
                    {
                        "value": "NO_SCATTER_FACTOR",
                        "description": "No scatter factor."
                    },
                    {
                        "value": "ONE_DAY",
                        "description": "Scatter updates over one day."
                    },
                    {
                        "value": "TWO_DAYS",
                        "description": "Scatter updates over two days."
                    },
                    {
                        "value": "THREE_DAYS",
                        "description": "Scatter updates over three days."
                    },
                    {
                        "value": "FOUR_DAYS",
                        "description": "Scatter updates over four days."
                    },
                    {
                        "value": "FIVE_DAYS",
                        "description": "Scatter updates over five days."
                    },
                    {
                        "value": "SIX_DAYS",
                        "description": "Scatter updates over six days."
                    },
                    {
                        "value": "SEVEN_DAYS",
                        "description": "Scatter updates over seven days."
                    },
                    {
                        "value": "EIGHT_DAYS",
                        "description": "Scatter updates over eight days."
                    },
                    {
                        "value": "NINE_DAYS",
                        "description": "Scatter updates over nine days."
                    },
                    {
                        "value": "TEN_DAYS",
                        "description": "Scatter updates over ten days."
                    },
                    {
                        "value": "ELEVEN_DAYS",
                        "description": "Scatter updates over eleven days."
                    },
                    {
                        "value": "TWELVE_DAYS",
                        "description": "Scatter updates over twelve days."
                    },
                    {
                        "value": "THIRTEEN_DAYS",
                        "description": "Scatter updates over thirteen days."
                    },
                    {
                        "value": "FOURTEEN_DAYS",
                        "description": "Scatter updates over fourteen days."
                    }
                ],
                "fieldDependencies": [],
                "nestedFields": [],
                "isActive": true
            }
        ],
        "fieldDependencies": [],
        "isActive": true
    },
    {
        "section": "autoUpdateTimeRestrictions",
        "field": "autoUpdateTimeRestrictions",
        "description": "Allows the admin to specify time restrictions for when automatic updates take place.",
        "type": "TYPE_MESSAGE",
        "label": "LABEL_OPTIONAL",
        "knownValueDescriptions": [],
        "nestedFields": [
            {
                "section": "autoUpdateTimeRestrictions.timeRestriction",
                "field": "timeRestriction",
                "description": "Update time restrictions.",
                "type": "TYPE_MESSAGE",
                "label": "LABEL_REPEATED",
                "knownValueDescriptions": [],
                "fieldDependencies": [],
                "nestedFields": [
                    {
                        "section": "autoUpdateTimeRestrictions.timeRestriction.start",
                        "field": "start",
                        "description": "Start.",
                        "type": "TYPE_MESSAGE",
                        "label": "LABEL_OPTIONAL",
                        "knownValueDescriptions": [],
                        "fieldDependencies": [],
                        "nestedFields": [
                            {
                                "section": "autoUpdateTimeRestrictions.timeRestriction.start.dayOfWeek",
                                "field": "dayOfWeek",
                                "description": "Day of week.",
                                "type": "TYPE_ENUM",
                                "label": "LABEL_OPTIONAL",
                                "knownValueDescriptions": [
                                    {
                                        "value": "MONDAY",
                                        "description": "Monday."
                                    },
                                    {
                                        "value": "TUESDAY",
                                        "description": "Tuesday."
                                    },
                                    {
                                        "value": "WEDNESDAY",
                                        "description": "Wednesday."
                                    },
                                    {
                                        "value": "THURSDAY",
                                        "description": "Thursday."
                                    },
                                    {
                                        "value": "FRIDAY",
                                        "description": "Friday."
                                    },
                                    {
                                        "value": "SATURDAY",
                                        "description": "Saturday."
                                    },
                                    {
                                        "value": "SUNDAY",
                                        "description": "Sunday."
                                    }
                                ],
                                "fieldDependencies": [],
                                "nestedFields": [],
                                "isActive": true
                            },
                            {
                                "section": "autoUpdateTimeRestrictions.timeRestriction.start.hours",
                                "field": "hours",
                                "description": "Hours.",
                                "type": "TYPE_INT32",
                                "label": "LABEL_OPTIONAL",
                                "knownValueDescriptions": [],
                                "fieldDependencies": [],
                                "nestedFields": [],
                                "isActive": true
                            },
                            {
                                "section": "autoUpdateTimeRestrictions.timeRestriction.start.minutes",
                                "field": "minutes",
                                "description": "Minutes.",
                                "type": "TYPE_ENUM",
                                "label": "LABEL_OPTIONAL",
                                "knownValueDescriptions": [
                                    {
                                        "value": "0",
                                        "description": "0."
                                    },
                                    {
                                        "value": "15",
                                        "description": "15."
                                    },
                                    {
                                        "value": "30",
                                        "description": "30."
                                    },
                                    {
                                        "value": "45",
                                        "description": "45."
                                    }
                                ],
                                "fieldDependencies": [],
                                "nestedFields": [],
                                "isActive": true
                            }
                        ],
                        "isActive": true
                    },
                    {
                        "section": "autoUpdateTimeRestrictions.timeRestriction.end",
                        "field": "end",
                        "description": "End.",
                        "type": "TYPE_MESSAGE",
                        "label": "LABEL_OPTIONAL",
                        "knownValueDescriptions": [],
                        "fieldDependencies": [],
                        "nestedFields": [],
                        "isActive": true
                    }
                ],
                "isActive": true
            }
        ],
        "fieldDependencies": [],
        "isActive": true
    },
    {
        "section": "autoUpdateTargetVersionLts",
        "field": "autoUpdateTargetVersionLts",
        "description": "Specifies the prefix of a target version Google ChromeOS should update to. If the device is running a version that's before the specified prefix, it will update to the latest version with the given prefix. If the device is already on a later version, effects depend on the value of DeviceRollbackToTargetVersion.",
        "type": "TYPE_MESSAGE",
        "label": "LABEL_OPTIONAL",
        "knownValueDescriptions": [],
        "nestedFields": [
            {
                "section": "autoUpdateTargetVersionLts.selectedVersion",
                "field": "selectedVersion",
                "description": "Selected auto update version.",
                "type": "TYPE_MESSAGE",
                "label": "LABEL_OPTIONAL",
                "knownValueDescriptions": [],
                "fieldDependencies": [],
                "nestedFields": [
                    {
                        "section": "autoUpdateTargetVersionLts.selectedVersion.displayName",
                        "field": "displayName",
                        "description": "Version name.",
                        "type": "TYPE_ENUM",
                        "label": "LABEL_OPTIONAL",
                        "knownValueDescriptions": [
                            {
                                "value": "No restriction",
                                "description": "Use latest available version."
                            },
                            {
                                "value": "127.*",
                                "description": "127.*."
                            },
                            {
                                "value": "128.*",
                                "description": "128.*."
                            },
                            {
                                "value": "129.*",
                                "description": "129.*."
                            },
                            {
                                "value": "130.*",
                                "description": "130.*."
                            },
                            {
                                "value": "126.* (long-term support)",
                                "description": "126.* (long-term support).",
                                "fieldDependencies": [
                                    {
                                        "sourceField": "releaseChannelWithLts",
                                        "sourceFieldValue": "RELEASE_CHANNEL_WITH_LTS_ENUM_LTS_CHANNEL"
                                    },
                                    {
                                        "sourceField": "releaseChannelWithLts",
                                        "sourceFieldValue": "RELEASE_CHANNEL_WITH_LTS_ENUM_LTC_CHANNEL"
                                    }
                                ]
                            }
                        ],
                        "fieldDependencies": [],
                        "nestedFields": [],
                        "isActive": true
                    }
                ],
                "isActive": true
            }
        ],
        "fieldDependencies": [
            {
                "sourceField": "updateDisabled",
                "sourceFieldValue": "false"
            }
        ],
        "isActive": false
    },
    {
        "section": "deviceMinimumVersionAueMessage",
        "field": "deviceMinimumVersionAueMessage",
        "description": "Final automatic update alert message. When a device reaches its last automatic update(https://support.google.com/chrome/a/answer/6220366)automatic , an alert is sent to the user. This text overrides the default message that will be shown on the device.",
        "type": "TYPE_STRING",
        "label": "LABEL_OPTIONAL",
        "knownValueDescriptions": [],
        "nestedFields": [],
        "fieldDependencies": [
            {
                "sourceField": "updateDisabled",
                "sourceFieldValue": "true"
            },
            {
                "sourceField": "updateDisabled",
                "sourceFieldValue": "false"
            }
        ],
        "isActive": false
    },
    {
        "section": "deviceMinimumVersion",
        "field": "deviceMinimumVersion",
        "description": "Sets the minimum version of ChromeOS a device must be updated to.",
        "type": "TYPE_MESSAGE",
        "label": "LABEL_OPTIONAL",
        "knownValueDescriptions": [],
        "nestedFields": [
            {
                "section": "deviceMinimumVersion.chromeosVersion",
                "field": "chromeosVersion",
                "description": "Chrome version.",
                "type": "TYPE_ENUM",
                "label": "LABEL_OPTIONAL",
                "knownValueDescriptions": [
                    {
                        "value": "",
                        "description": "Do not enforce updates."
                    },
                    {
                        "value": "13421",
                        "description": "86.*."
                    },
                    {
                        "value": "13505",
                        "description": "87.*."
                    },
                    {
                        "value": "13597",
                        "description": "88.*."
                    },
                    {
                        "value": "13729",
                        "description": "89.*."
                    },
                    {
                        "value": "13816",
                        "description": "90.*."
                    },
                    {
                        "value": "13904",
                        "description": "91.*."
                    },
                    {
                        "value": "13982",
                        "description": "92.*."
                    },
                    {
                        "value": "14092",
                        "description": "93.*."
                    },
                    {
                        "value": "14150",
                        "description": "94.*."
                    },
                    {
                        "value": "14268",
                        "description": "96.*."
                    },
                    {
                        "value": "14324",
                        "description": "97.*."
                    },
                    {
                        "value": "14388",
                        "description": "98.*."
                    },
                    {
                        "value": "14469",
                        "description": "99.*."
                    },
                    {
                        "value": "14526",
                        "description": "100.*."
                    },
                    {
                        "value": "14588",
                        "description": "101.*."
                    },
                    {
                        "value": "14695",
                        "description": "102.*."
                    },
                    {
                        "value": "14816",
                        "description": "103.*."
                    },
                    {
                        "value": "14909",
                        "description": "104.*."
                    },
                    {
                        "value": "14989",
                        "description": "105.*."
                    },
                    {
                        "value": "15054",
                        "description": "106.*."
                    },
                    {
                        "value": "15117",
                        "description": "107.*."
                    },
                    {
                        "value": "15183",
                        "description": "108.*."
                    },
                    {
                        "value": "15236",
                        "description": "109.*."
                    },
                    {
                        "value": "15278",
                        "description": "110.*."
                    },
                    {
                        "value": "15329",
                        "description": "111.*."
                    },
                    {
                        "value": "15359",
                        "description": "112.*."
                    },
                    {
                        "value": "15393",
                        "description": "113.*."
                    },
                    {
                        "value": "15437",
                        "description": "114.*."
                    },
                    {
                        "value": "15474",
                        "description": "115.*."
                    },
                    {
                        "value": "15509",
                        "description": "116.*."
                    },
                    {
                        "value": "15572",
                        "description": "117.*."
                    },
                    {
                        "value": "15604",
                        "description": "118.*."
                    },
                    {
                        "value": "15633",
                        "description": "119.*."
                    },
                    {
                        "value": "15662",
                        "description": "120.*."
                    },
                    {
                        "value": "15699",
                        "description": "121.*."
                    },
                    {
                        "value": "15753",
                        "description": "122.*."
                    },
                    {
                        "value": "15786",
                        "description": "123.*."
                    },
                    {
                        "value": "15823",
                        "description": "124.*."
                    },
                    {
                        "value": "15853",
                        "description": "125.*."
                    },
                    {
                        "value": "15886",
                        "description": "126.*."
                    },
                    {
                        "value": "15917",
                        "description": "127.*."
                    },
                    {
                        "value": "15964",
                        "description": "128.*."
                    },
                    {
                        "value": "16002",
                        "description": "129.*."
                    }
                ],
                "fieldDependencies": [],
                "nestedFields": [],
                "isActive": true
            },
            {
                "section": "deviceMinimumVersion.aueWarningPeriodDays",
                "field": "aueWarningPeriodDays",
                "description": "Extended period to update for Auto Update Expiration devices (AUE).",
                "type": "TYPE_ENUM",
                "label": "LABEL_OPTIONAL",
                "knownValueDescriptions": [
                    {
                        "value": "0",
                        "description": "No warning."
                    },
                    {
                        "value": "7",
                        "description": "One week."
                    },
                    {
                        "value": "14",
                        "description": "Two weeks."
                    },
                    {
                        "value": "21",
                        "description": "Three weeks."
                    },
                    {
                        "value": "28",
                        "description": "Four weeks."
                    },
                    {
                        "value": "35",
                        "description": "Five weeks."
                    },
                    {
                        "value": "42",
                        "description": "Six weeks."
                    },
                    {
                        "value": "49",
                        "description": "Seven weeks."
                    },
                    {
                        "value": "56",
                        "description": "Eight weeks."
                    },
                    {
                        "value": "63",
                        "description": "Nine weeks."
                    },
                    {
                        "value": "70",
                        "description": "Ten weeks."
                    },
                    {
                        "value": "77",
                        "description": "Eleven weeks."
                    },
                    {
                        "value": "84",
                        "description": "Twelve weeks."
                    }
                ],
                "fieldDependencies": [],
                "nestedFields": [],
                "isActive": true
            },
            {
                "section": "deviceMinimumVersion.warningPeriodDays",
                "field": "warningPeriodDays",
                "description": "Period to block devices and user sessions after if the device is not update to chrome_version.",
                "type": "TYPE_ENUM",
                "label": "LABEL_OPTIONAL",
                "knownValueDescriptions": [
                    {
                        "value": "0",
                        "description": "No warning."
                    },
                    {
                        "value": "7",
                        "description": "One week."
                    },
                    {
                        "value": "14",
                        "description": "Two weeks."
                    },
                    {
                        "value": "21",
                        "description": "Three weeks."
                    },
                    {
                        "value": "28",
                        "description": "Four weeks."
                    },
                    {
                        "value": "35",
                        "description": "Five weeks."
                    },
                    {
                        "value": "42",
                        "description": "Six weeks."
                    }
                ],
                "fieldDependencies": [],
                "nestedFields": [],
                "isActive": true
            }
        ],
        "fieldDependencies": [
            {
                "sourceField": "updateDisabled",
                "sourceFieldValue": "true"
            },
            {
                "sourceField": "updateDisabled",
                "sourceFieldValue": "false"
            }
        ],
        "isActive": false
    },
    {
        "section": "autoUpdateHttpDownloadsEnabled",
        "field": "autoUpdateHttpDownloadsEnabled",
        "description": "Update downloads. Controls whether update downloads use HTTP or HTTPS.",
        "type": "TYPE_BOOL",
        "label": "LABEL_OPTIONAL",
        "defaultValue": false,
        "knownValueDescriptions": [
            {
                "value": "true",
                "description": "Use HTTP for update downloads."
            },
            {
                "value": "false",
                "description": "Use HTTPS for update downloads."
            }
        ],
        "nestedFields": [],
        "fieldDependencies": [
            {
                "sourceField": "updateDisabled",
                "sourceFieldValue": "true"
            },
            {
                "sourceField": "updateDisabled",
                "sourceFieldValue": "false"
            }
        ],
        "isActive": false
    },
    {
        "section": "releaseChannelWithLts",
        "field": "releaseChannelWithLts",
        "description": "Release channel. Changing the release channel can have drastic effects on the current organization and its children. Ensure any changes to this setting are intended. Learn more about release channels: https://support.google.com/chrome/a/answer/1375678#release_channel?hl={$languageCode}.",
        "type": "TYPE_ENUM",
        "label": "LABEL_OPTIONAL",
        "defaultValue": "RELEASE_CHANNEL_WITH_LTS_ENUM_STABLE_CHANNEL",
        "knownValueDescriptions": [
            {
                "value": "RELEASE_CHANNEL_WITH_LTS_ENUM_ALLOW_USER_CHOICE",
                "description": "Allow user to configure."
            },
            {
                "value": "RELEASE_CHANNEL_WITH_LTS_ENUM_STABLE_CHANNEL",
                "description": "Stable channel."
            },
            {
                "value": "RELEASE_CHANNEL_WITH_LTS_ENUM_BETA_CHANNEL",
                "description": "Beta channel."
            },
            {
                "value": "RELEASE_CHANNEL_WITH_LTS_ENUM_LTS_CHANNEL",
                "description": "Long-term support channel."
            },
            {
                "value": "RELEASE_CHANNEL_WITH_LTS_ENUM_LTC_CHANNEL",
                "description": "Long-term support candidate channel."
            },
            {
                "value": "RELEASE_CHANNEL_WITH_LTS_ENUM_DEV_CHANNEL",
                "description": "Dev channel (may be unstable)."
            }
        ],
        "nestedFields": [],
        "fieldDependencies": [
            {
                "sourceField": "updateDisabled",
                "sourceFieldValue": "true"
            },
            {
                "sourceField": "updateDisabled",
                "sourceFieldValue": "false"
            }
        ],
        "isActive": false
    },
    {
        "section": "deviceAutoUpdatePeerToPeerEnabled",
        "field": "deviceAutoUpdatePeerToPeerEnabled",
        "description": "Peer to peer. Controls whether peer to peer auto update downloads are allowed.",
        "type": "TYPE_BOOL",
        "label": "LABEL_OPTIONAL",
        "defaultValue": true,
        "knownValueDescriptions": [
            {
                "value": "true",
                "description": "Allow peer to peer auto update downloads."
            },
            {
                "value": "false",
                "description": "Do not allow peer to peer auto update downloads."
            }
        ],
        "nestedFields": [],
        "fieldDependencies": [
            {
                "sourceField": "updateDisabled",
                "sourceFieldValue": "true"
            },
            {
                "sourceField": "updateDisabled",
                "sourceFieldValue": "false"
            }
        ],
        "isActive": false
    }
]