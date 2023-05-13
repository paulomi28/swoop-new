{/* <View style={{
                flex: 1,
                paddingHorizontal: SIZES.padding,
                marginVertical: SIZES.padding
            }}>
                <View style={{
                    marginVertical: SIZES.padding / 2,

                    flexDirection: 'row',
                }}>
                    <View>
                        <Image
                            source={isDark ? icons.ic_planline_dark : icons.ic_planline_light}
                            style={{ width: 27, height: 27 }}
                        />
                    </View>
                    <View style={{
                        marginHorizontal: SIZES.padding
                    }}>
                        <View>
                            <Text style={{
                                fontSize: SIZES.h3,
                                color: isDark ? COLORS.golden : COLORS.black,
                                fontWeight: '500'
                            }}>FR8249</Text>
                        </View>
                        <View style={{ marginVertical: SIZES.padding / 4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ alignItems: 'flex-start' }}>
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black, fontWeight: '500' }}>FAO</Text>
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black }}>13:05z</Text>
                            </View>
                            <View style={{ borderBottomWidth: 1, width: SIZES.width / 12, borderColor: isDark ? COLORS.lightGolden : COLORS.darkGray, marginHorizontal: SIZES.padding / 2 }}></View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    source={isDark ? icons.ic_logo_icon_dark : icons.ic_logo_icon_light}
                                    style={{ width: 18, height: 18 }}
                                />
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black }}>Duration: 2:35h</Text>
                            </View>
                            <View style={{ borderBottomWidth: 1, width: SIZES.width / 12, borderColor: isDark ? COLORS.lightGolden : COLORS.darkGray, marginHorizontal: SIZES.padding / 2 }}></View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black, fontWeight: '500' }}>BRS</Text>
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black }}>15:40z</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{
                    marginVertical: SIZES.padding / 2,

                    flexDirection: 'row',
                }}>
                    <View>
                        <Image
                            source={isDark ? icons.ic_planline_dark : icons.ic_planline_light}
                            style={{ width: 27, height: 27 }}
                        />
                    </View>
                    <View style={{
                        marginHorizontal: SIZES.padding
                    }}>
                        <View>
                            <Text style={{
                                fontSize: SIZES.h3,
                                color: isDark ? COLORS.golden : COLORS.black,
                                fontWeight: '500'
                            }}>FR8248</Text>
                        </View>
                        <View style={{ marginVertical: SIZES.padding / 4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ alignItems: 'flex-start' }}>
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black, fontWeight: '500' }}>BRS</Text>
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black }}>16:05z</Text>
                            </View>
                            <View style={{ borderBottomWidth: 1, width: SIZES.width / 12, borderColor: isDark ? COLORS.lightGolden : COLORS.darkGray, marginHorizontal: SIZES.padding / 2 }}></View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    source={isDark ? icons.ic_logo_icon_dark : icons.ic_logo_icon_light}
                                    style={{ width: 18, height: 18 }}
                                />
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black }}>Duration: 2:35h</Text>
                            </View>
                            <View style={{ borderBottomWidth: 1, width: SIZES.width / 12, borderColor: isDark ? COLORS.lightGolden : COLORS.darkGray, marginHorizontal: SIZES.padding / 2 }}></View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black, fontWeight: '500' }}>FAO</Text>
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black }}>18:40z</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{
                    marginVertical: SIZES.padding / 2,

                    flexDirection: 'row',
                }}>
                    <View>
                        <Image
                            source={isDark ? icons.ic_planline_dark : icons.ic_planline_light}
                            style={{ width: 27, height: 27 }}
                        />
                    </View>
                    <View style={{
                        marginHorizontal: SIZES.padding
                    }}>
                        <View>
                            <Text style={{
                                fontSize: SIZES.h3,
                                color: isDark ? COLORS.golden : COLORS.black,
                                fontWeight: '500'
                            }}>FR8930</Text>
                        </View>
                        <View style={{ marginVertical: SIZES.padding / 4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ alignItems: 'flex-start' }}>
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black, fontWeight: '500' }}>FAO</Text>
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black }}>19:05z</Text>
                            </View>
                            <View style={{ borderBottomWidth: 1, width: SIZES.width / 12, borderColor: isDark ? COLORS.lightGolden : COLORS.darkGray, marginHorizontal: SIZES.padding / 2 }}></View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    source={isDark ? icons.ic_logo_icon_dark : icons.ic_logo_icon_light}
                                    style={{ width: 18, height: 18 }}
                                />
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black }}>Duration: 2:35h</Text>
                            </View>
                            <View style={{ borderBottomWidth: 1, width: SIZES.width / 12, borderColor: isDark ? COLORS.lightGolden : COLORS.darkGray, marginHorizontal: SIZES.padding / 2 }}></View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black, fontWeight: '500' }}>VLC</Text>
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black }}>20:30z</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{
                    marginVertical: SIZES.padding / 2,

                    flexDirection: 'row',
                }}>
                    <View>
                        <Image
                            source={isDark ? icons.ic_planline_dark : icons.ic_planline_light}
                            style={{ width: 27, height: 27 }}
                        />
                    </View>
                    <View style={{
                        marginHorizontal: SIZES.padding
                    }}>
                        <View>
                            <Text style={{
                                fontSize: SIZES.h3,
                                color: isDark ? COLORS.lightGolden : COLORS.darkGray,
                            }}>4th Sector Flight Number</Text>
                        </View>

                    </View>
                </View>
            </View> */}