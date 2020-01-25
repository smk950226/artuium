import { StyleSheet, Dimensions, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const { width, height } = Dimensions.get('window');
const iosStatusBarHeight = getStatusBarHeight()

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    row: {
        flexDirection: 'row'
    },
    flexWrap: {
        flexWrap: 'wrap'
    },
    flex1: {
        flex: 1
    },
    flex2: {
        flex: 2
    },
    flex3: {
        flex: 3
    },
    flex4: {
        flex: 4
    },
    flex5: {
        flex: 5
    },
    flex6: {
        flex: 6
    },
    flex7: {
        flex: 7
    },
    flex8: {
        flex: 8
    },
    flex9: {
        flex: 9
    },
    flex10: {
        flex: 10
    },
    font8: {
        fontSize: 8,
        includeFontPadding: false
    },
    font9: {
        fontSize: 9,
        includeFontPadding: false
    },
    font10: {
        fontSize: 10,
        includeFontPadding: false
    },
    font11: {
        fontSize: 11,
        includeFontPadding: false
    },
    font12: {
        fontSize: 12,
        includeFontPadding: false
    },
    font13: {
        fontSize: 13,
        includeFontPadding: false
    },
    font14: {
        fontSize: 14,
        includeFontPadding: false
    },
    font15: {
        fontSize: 15,
        includeFontPadding: false
    },
    font16: {
        fontSize: 16,
        includeFontPadding: false
    },
    font17: {
        fontSize: 17,
        includeFontPadding: false
    },
    font18: {
        fontSize: 18,
        includeFontPadding: false
    },
    font19: {
        fontSize: 19,
        includeFontPadding: false
    },
    font20: {
        fontSize: 20,
        includeFontPadding: false
    },
    font21: {
        fontSize: 21,
        includeFontPadding: false
    },
    font22: {
        fontSize: 22,
        includeFontPadding: false
    },
    font23: {
        fontSize: 23,
        includeFontPadding: false
    },
    font24: {
        fontSize: 24,
        includeFontPadding: false
    },
    font25: {
        fontSize: 25,
        includeFontPadding: false
    },
    font26: {
        fontSize: 26,
        includeFontPadding: false
    },
    font27: {
        fontSize: 27,
        includeFontPadding: false
    },
    font28: {
        fontSize: 28,
        includeFontPadding: false
    },
    font29: {
        fontSize: 29,
        includeFontPadding: false
    },
    font30: {
        fontSize: 30,
        includeFontPadding: false
    },
    font31: {
        fontSize: 31,
        includeFontPadding: false
    },
    font32: {
        fontSize: 32,
        includeFontPadding: false
    },
    font33: {
        fontSize: 33,
        includeFontPadding: false
    },
    font34: {
        fontSize: 34,
        includeFontPadding: false
    },
    font35: {
        fontSize: 35,
        includeFontPadding: false
    },
    font36: {
        fontSize: 36,
        includeFontPadding: false
    },
    font37: {
        fontSize: 37,
        includeFontPadding: false
    },
    font38: {
        fontSize: 38,
        includeFontPadding: false
    },
    font39: {
        fontSize: 39,
        includeFontPadding: false
    },
    font40: {
        fontSize: 40,
        includeFontPadding: false
    },
    fontBlack: {
        fontFamily: 'NotoSansKR-Black',
        includeFontPadding: false
    },
    fontBold: {
        fontFamily: 'NotoSansKR-Bold',
        includeFontPadding: false
    },
    fontMedium: {
        fontFamily: 'NotoSansKR-Medium',
        includeFontPadding: false
    },
    fontRegular: {
        fontFamily: 'NotoSansKR-Regular',
        includeFontPadding: false
    },
    fontThin: {
        fontFamily: 'NotoSansKR-Thin',
        includeFontPadding: false
    },
    fontLight: {
        fontFamily: 'NotoSansKR-Light',
        includeFontPadding: false
    },
    white: {
        color: 'white',
        includeFontPadding: false
    },
    black: {
        color: 'black',
        includeFontPadding: false
    },
    red: {
        color: '#ff0000',
        includeFontPadding: false
    },
    yellow: {
        color: '#ffbd40',
        includeFontPadding: false
    },
    blue: {
        color: '#1162d0',
        includeFontPadding: false
    },
    gray8B: {
        color: '#8b8b8b',
        includeFontPadding: false
    },
    grayA7: {
        color: '#a7a7a7',
        includeFontPadding: false
    },
    gray12: {
        color: '#121212',
        includeFontPadding: false
    },
    grayD1: {
        color: '#D1D1D1',
        includeFontPadding: false
    },
    grayC9: {
        color: '#C9C9C9',
        includeFontPadding: false
    },
    grayDb: {
        color: '#DbDbDb',
        includeFontPadding: false
    },
    gray93: {
        color: '#939393',
        includeFontPadding: false
    },
    gray91: {
        color: '#919191',
        includeFontPadding: false
    },
    gray71: {
        color: '#717171',
        includeFontPadding: false
    },
    grayE6: {
        color: '#E6E6E6',
        includeFontPadding: false
    },
    grayEb: {
        color: '#EbEbEb',
        includeFontPadding: false
    },
    grayF4: {
        color: '#F4F4F4',
        includeFontPadding: false
    },
    grayA8: {
        color: '#A8A8A8',
        includeFontPadding: false
    },
    grayBa: {
        color: '#BaBaBa',
        includeFontPadding: false
    },
    bgBlack: {
        backgroundColor: '#000000'
    },
    bgBlack07: {
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    bgBlack18: {
        backgroundColor: 'rgb(18,18,18)'
    },
    bgWhite: {
        backgroundColor: '#FFFFFF'
    },
    bgTransparent: {
        backgroundColor: 'transparent'
    },
    bgRed: {
        backgroundColor: '#FF0000'
    },
    bgYellow: {
        backgroundColor: '#ffbd40'
    },
    bgGray33: {
        backgroundColor: '#333333'
    },
    bgGrayA7: {
        backgroundColor: '#a7a7a7'
    },
    bgGray12: {
        backgroundColor: '#121212'
    },
    bgGrayD1: {
        backgroundColor: '#D1D1D1'
    },
    bgGrayC9: {
        backgroundColor: '#C9C9C9'
    },
    bgGrayDb: {
        backgroundColor: '#DbDbDb'
    },
    bgGrayF8: {
        backgroundColor: '#F8F8F8'
    },
    bgGrayE6: {
        backgroundColor: '#E6E6E6'
    },
    bgGrayEb: {
        backgroundColor: '#EbEbEb'
    },
    bgGray71: {
        backgroundColor: '#717171'
    },
    bgBlue: {
        backgroundColor: '#1162D0'
    },
    bgLightBlue: {
        backgroundColor: '#E0EDFF'
    },
    bgGrayf0: {
        backgroundColor: '#f0f0f0'
    },
    bgGrayF4: {
        backgroundColor: '#F4F4F4'
    },
    bgGrayFc: {
        backgroundColor: '#FcFcFc'
    },
    justifyContentCenter: {
        justifyContent: 'center'
    },
    justifyContentEnd: {
        justifyContent: 'flex-end'
    },
    justifyContentStart: {
        justifyContent: 'flex-start'
    },
    justifyContentAround: {
        justifyContent: 'space-around'
    },
    justifyContentBetween: {
        justifyContent: 'space-between'
    },
    justifyContentEven: {
        justifyContent: 'space-evenly'
    },
    alignItemsCenter: {
        alignItems: 'center'
    },
    alignItemsEnd: {
        alignItems: 'flex-end'
    },
    alignItemsStart: {
        alignItems: 'flex-start'
    },
    screenWidth: {
        width
    },
    screenHeight: {
        height
    },
    heightFull: {
        height: '100%'
    },
    height95: {
        height: '95%'
    },
    height90: {
        height: '90%'
    },
    height85: {
        height: '85%'
    },
    height80: {
        height: '80%'
    },
    height75: {
        height: '75%'
    },
    height70: {
        height: '70%'
    },
    height65: {
        height: '65%'
    },
    height60: {
        height: '60%'
    },
    height50: {
        height: '50%'
    },
    widthFull: {
        width: '100%'
    },
    width95: {
        width: '95%'
    },
    width90: {
        width: '90%'
    },
    width85: {
        width: '85%'
    },
    width80: {
        width: '80%'
    },
    width75: {
        width: '75%'
    },
    width70: {
        width: '70%'
    },
    width65: {
        width: '65%'
    },
    width60: {
        width: '60%'
    },
    width50: {
        width: '50%'
    },
    width40: {
        width: '40%'
    },
    width30: {
        width: '30%'
    },
    mt5: {
        marginTop: 5
    },
    mt10: {
        marginTop: 10
    },
    mt15: {
        marginTop: 15
    },
    mt20: {
        marginTop: 20
    },
    mt25: {
        marginTop: 25
    },
    mt30: {
        marginTop: 30
    },
    mt40: {
        marginTop: 40
    },
    mt50: {
        marginTop: 50
    },
    mb5: {
        marginBottom: 5
    },
    mb10: {
        marginBottom: 10
    },
    mb15: {
        marginBottom: 15
    },
    mb20: {
        marginBottom: 20
    },
    mb25: {
        marginBottom: 25
    },
    mb30: {
        marginBottom: 30
    },
    mb50: {
        marginBottom: 50
    },
    ml5: {
        marginLeft: 5
    },
    ml10: {
        marginLeft: 10
    },
    ml15: {
        marginLeft: 15
    },
    ml20: {
        marginLeft: 20
    },
    ml25: {
        marginLeft: 25
    },
    ml30: {
        marginLeft: 30
    },
    mr5: {
        marginRight: 5
    },
    mr10: {
        marginRight: 10
    },
    mr15: {
        marginRight: 15
    },
    mr20: {
        marginRight: 20
    },
    mr25: {
        marginRight: 25
    },
    mr30: {
        marginRight: 30
    },
    mx5: {
        marginHorizontal: 5
    },
    mx10: {
        marginHorizontal: 10
    },
    mx15: {
        marginHorizontal: 15
    },
    mx20: {
        marginHorizontal: 20
    },
    mx25: {
        marginHorizontal: 25
    },
    mx30: {
        marginHorizontal: 30
    },
    mx40: {
        marginHorizontal: 40
    },
    my5: {
        marginVertical: 5
    },
    my10: {
        marginVertical: 10
    },
    my15: {
        marginVertical: 15
    },
    my20: {
        marginVertical: 20
    },
    my25: {
        marginVertical: 25
    },
    my30: {
        marginVertical: 30
    },
    paddingIOS: {
        paddingTop: iosStatusBarHeight
    },
    pt5: {
        paddingTop: 5
    },
    pt10: {
        paddingTop: 10
    },
    pt15: {
        paddingTop: 15
    },
    pt20: {
        paddingTop: 20
    },
    pt25: {
        paddingTop: 25
    },
    pt30: {
        paddingTop: 30
    },
    pb5: {
        paddingBottom: 5
    },
    pb10: {
        paddingBottom: 10
    },
    pb15: {
        paddingBottom: 15
    },
    pb20: {
        paddingBottom: 20
    },
    pb25: {
        paddingBottom: 25
    },
    pb30: {
        paddingBottom: 30
    },
    pl5: {
        paddingLeft: 5
    },
    pl10: {
        paddingLeft: 10
    },
    pl15: {
        paddingLeft: 15
    },
    pl20: {
        paddingLeft: 20
    },
    pl25: {
        paddingLeft: 25
    },
    pl30: {
        paddingLeft: 30
    },
    pr5: {
        paddingRight: 5
    },
    pr10: {
        paddingRight: 10
    },
    pr15: {
        paddingRight: 15
    },
    pr20: {
        paddingRight: 20
    },
    pr25: {
        paddingRight: 25
    },
    pr30: {
        paddingRight: 30
    },
    px2: {
        paddingHorizontal: 2
    },
    px3: {
        paddingHorizontal: 3
    },
    px5: {
        paddingHorizontal: 5
    },
    px10: {
        paddingHorizontal: 10
    },
    px15: {
        paddingHorizontal: 15
    },
    px20: {
        paddingHorizontal: 20
    },
    px25: {
        paddingHorizontal: 25
    },
    px30: {
        paddingHorizontal: 30
    },
    py2: {
        paddingVertical: 2
    },
    py3: {
        paddingVertical: 3
    },
    py5: {
        paddingVertical: 5
    },
    py10: {
        paddingVertical: 10
    },
    py15: {
        paddingVertical: 15
    },
    py20: {
        paddingVertical: 20
    },
    py25: {
        paddingVertical: 25
    },
    py30: {
        paddingVertical: 30
    },
    textCenter: {
        textAlign: 'center',
        includeFontPadding: false
    },
    textLeft: {
        textAlign: 'left',
        includeFontPadding: false
    },
    textRight: {
        textAlign: 'right',
        includeFontPadding: false
    },
    alignSelfCenter: {
        alignSelf: 'center'
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    borderRadius3: {
        borderRadius: 3
    },
    borderRadius5: {
        borderRadius: 5
    },
    borderRadius10: {
        borderRadius: 10
    },
    borderRadius15: {
        borderRadius: 15
    },
    borderRadiusRound: {
        borderRadius: 9999
    },
    borderTopRadius10: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    borderBtmRadius10: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    borderLeftRadius5: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    borderLeftRadius10: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    borderBtmGrayDb: {
        borderBottomColor: '#dbdbdb',
        borderBottomWidth: 1
    },
    borderBtmGrayD1: {
        borderBottomColor: '#d1d1d1',
        borderBottomWidth: 1
    },
    borderBtmGrayE6: {
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 1
    },
    borderBtmGray70: {
        borderBottomColor: '#707070',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    borderBtmGrayE8: {
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1
    },
    borderGrayF0: {
        borderColor: '#F0F0F0',
        borderWidth: 1
    },
    borderGrayE6: {
        borderColor: '#E6E6E6',
        borderWidth: 1
    },
    borderGray91: {
        borderColor: '#919191',
        borderWidth: 1
    },
    overflowHidden: {
        overflow: 'hidden'
    },
    hidden: {
        opacity: 0
    },
    iconTab: {
        width: 30,
        height: 30
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
    spaceAround: {
        justifyContent: 'space-around'
    },
    spaceEvenly: {
        justifyContent: 'space-evenly'
    },
    homeMenuShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    loginShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1,
    },
    exMenuShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    textUnderline: {
        textDecorationLine: 'underline'
    },
    artworkImage: {
        width: '100%',
        height: 80
    },
    artworkImageLg: {
        width: '100%',
        height: 225
    },
    artworkBorder: {
        borderRadius: 5,
        borderWidth: .5,
        borderColor: 'rgb(226,226,226)'
    },
    profileImage30: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    profileImage40: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    profileImage50: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    profileImage70: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    emoji: {
        width: 14,
        height: 14
    },
    emojiLg: {
        width: 18,
        height: 18
    },
    emojiXl: {
        width: 26,
        height: 26
    },
    icon12: {
        width: 12,
        height: 12
    },
    icon15: {
        width: 15,
        height: 15
    },
    icon20: {
        width: 20,
        height: 20
    },
    icon25: {
        width: 25,
        height: 25
    },
    icon30: {
        width: 30,
        height: 30
    },
    lineHeight20: {
        lineHeight: 20
    },
    sliderDot: {
        borderColor: '#C9C9C9',
        borderWidth: 1,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#C9C9C9'
    },
    sliderDotEmpty: {
        borderColor: '#C9C9C9',
        borderWidth: 1,
        width: 8,
        height: 8,
        borderRadius: 4
    },
    recommend: {
        borderRadius: 5,
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    exCardShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    hole: {
        width: 9,
        height: 7,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#dbdbdb',
        marginVertical: 5
    },
    line: {
        borderWidth: 1,
        borderColor: '#efefef',
        backgroundColor: '#f7f7f7',
        height: 5,
        width: width,
        marginBottom: 35
    },
    sliderDotWhite: {
        borderColor: '#fff',
        borderWidth: 1,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#fff'
    },
    sliderDotWhiteEmpty: {
        borderColor: '#fff',
        borderWidth: 1,
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    sliderDotWhiteLg: {
        borderColor: '#fff',
        borderWidth: 1,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#fff'
    },
    sliderDotWhiteEmptyLg: {
        borderColor: '#fff',
        borderWidth: 1,
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    sliderDotGray: {
        borderColor: '#c9c9c9',
        borderWidth: 1,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#c9c9c9'
    },
    sliderDotGrayEmpty: {
        borderColor: '#c9c9c9',
        borderWidth: 1,
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    exhibitionFull: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ededed',
    },
    exitBtn: {
        width: 75,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderWidth: 1,
        borderColor: '#c3c3c3',
    },
    transExitBtn: {
        width: 75,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#c3c3c3',
    }, 
    relatedBtn: {
        width: 150,
        height: 35,
        borderRadius: 35/2,
        borderWidth: 1,
        borderColor: '#c3c3c3',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(18,18,18)'
    }, 
    relatedBtn2: {
        width: 150,
        height: 35,
        borderRadius: 35/2,
        borderWidth: 1,
        borderColor: '#c6c6c6',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    upBtn: {
        width: 50, 
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    divView: {
        width: "100%",
        height: 4,
        backgroundColor: '#fafafa',
        borderWidth: 1,
        borderColor: '#e8e8e8',
    },
    profileBtn: {
        width: 85,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#a8a8a8'
    },
    profileBox: {
        width: '100%',
        height: 110,
        borderRadius: 10,
        backgroundColor: '#fff',
        paddingVertical: 20
    },
    othersProfileBox: {
        width: '100%',
        height: 110,
        paddingVertical: 20
    },
    loginBtn: {
        width: 300,
        height: 50
    },
    circle6: {
        width: 6,
        height: 6,
        borderRadius: 3
    },
    circle30: {
        width: 30,
        height: 30,
        borderRadius: 15
    },
    circle40: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    profileModalShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    blueBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderColor: '#044ae6',
        borderRadius: 5,
        borderWidth: 1
    },
    smBlueBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderColor: '#044ae6',
        borderRadius: 5,
        borderWidth: 1
    },
    divGray: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        backgroundColor: '#e8e8e8',
        width,
        height: 6
    },
    GrayXBtn: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#969696',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginModal: {
        borderRadius: 20,
        backgroundColor: '#fff'
    },
    opacity07: {
        opacity: .7
    },
    sliderLine: {
        width: 25,
        height: 3
    },
    othersFollowBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: '#1162d0',
        borderRadius: 5,
    },
    othersUnfollowBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: '#888888',
        borderRadius: 5,
    },
})

export default styles; 