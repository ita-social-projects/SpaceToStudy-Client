;(window.webpackJsonp = window.webpackJsonp || []).push([
  [4],
  {
    './.storybook/preview.js-generated-config-entry.js': function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__)
      var preview_namespaceObject = {}
      __webpack_require__.r(preview_namespaceObject),
        __webpack_require__.d(preview_namespaceObject, 'parameters', function () {
          return parameters
        }),
        __webpack_require__.d(preview_namespaceObject, 'decorators', function () {
          return decorators
        })
      var ClientApi = __webpack_require__('./node_modules/@storybook/client-api/dist/esm/ClientApi.js'),
        ThemeProvider =
          (__webpack_require__('./src/styles/index.css'),
          __webpack_require__('./node_modules/@mui/system/esm/ThemeProvider/ThemeProvider.js')),
        createTheme = __webpack_require__('./node_modules/@mui/material/styles/createTheme.js'),
        blueGrey = __webpack_require__('./node_modules/@mui/material/colors/blueGrey.js'),
        app_pallete = {
          primary: blueGrey.a,
          backgroundColor: '#F7F7F7',
          basic: { black: '#000000', white: '#FFFFFF', grey: '#ECEFF1' },
          companyBlue: 'rgba(0, 167, 167, 0.2)',
          error: {
            50: '#FFEFF2',
            100: '#FFCFD4',
            200: '#F19B9A',
            300: '#E77574',
            400: '#F25750',
            500: '#F54636',
            600: '#E63C35',
            700: '#D32F2F',
            800: '#C72A28',
            900: '#B91F1B'
          },
          success: {
            50: '#EBF3EB',
            100: '#CCE7CD',
            200: '#A7D5A8',
            300: '#82C684',
            400: '#68BA6A',
            500: '#4CAF50',
            600: '#44A148',
            700: '#388D3C',
            800: '#2C7C32',
            900: '#1E5F23'
          },
          text: { primary: blueGrey.a[900] }
        },
        app_typography = {
          fontFamily: ['Rubik', '-apple-system', 'Arial', 'sans-serif'].join(','),
          h1: { fontWeight: 800, fontSize: '72px', letterSpacing: '-1.5px', lineHeight: '85px' },
          h2: { fontWeight: 600, fontSize: '61px', lineHeight: '92px', letterSpacing: '-0.5px' },
          h3: { fontWeight: 500, fontSize: '49px', lineHeight: '74px' },
          h4: { fontWeight: 500, fontSize: '35px', lineHeight: '53px' },
          h5: { fontWeight: 400, fontSize: '24px', lineHeight: '36px' },
          h6: { fontWeight: 500, fontSize: '20px', lineHeight: '28px', letterSpacing: '0.15px' },
          subtitle1: { fontWeight: 400, fontSize: '16px', lineHeight: '24px', letterSpacing: '0.15px' },
          subtitle2: { fontWeight: 500, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.1px' },
          body1: { fontWeight: 400, fontSize: '16px', lineHeight: '24px', letterSpacing: '0.5px' },
          body2: { fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.0025em' },
          caption: { fontWeight: 400, fontSize: '12px', lineHeight: '20px', letterSpacing: '0.4px' },
          overline: {
            fontWeight: 400,
            fontSize: '10px',
            lineHeight: '15px',
            letterSpacing: '1.5px',
            textTransform: 'uppercase'
          },
          button: {
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '0.5px',
            textTransform: 'initial'
          },
          button1: {
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0.5px',
            textTransform: 'initial'
          }
        },
        app_button = {
          styleOverrides: {
            root: { lineHeight: '20px', fontSize: '14px', opacity: '1' },
            sizeSmall: { fontSize: '12px', padding: '6px 16px' },
            sizeMedium: { padding: '10px 24px' },
            sizeLarge: { padding: '12px 24px', fontSize: '16px' },
            sizeExtraLarge: { padding: '16px 32px', fontSize: '16px' },
            contained: { backgroundColor: app_pallete.primary[900], color: app_pallete.primary[50] },
            outlined: { color: app_pallete.primary[900] },
            text: { color: app_pallete.primary[900] },
            tonal: { backgroundColor: app_pallete.primary[50] }
          }
        },
        app_tooltip = {
          styleOverrides: {
            tooltip: { backgroundColor: app_pallete.primary[900], fontSize: '11px', padding: '4px 8px' },
            arrow: { color: app_pallete.primary[900] }
          }
        },
        svgIcon = {
          styleOverrides: {
            colorPrimary: { color: app_pallete.primary[900] },
            colorSecondary: { color: app_pallete.primary[700] },
            colorDisabled: { color: app_pallete.primary[100] }
          }
        },
        defineProperty = __webpack_require__(
          './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js'
        ),
        checkboxClasses = __webpack_require__('./node_modules/@mui/material/Checkbox/checkboxClasses.js'),
        app_checkbox_checkbox = {
          styleOverrides: {
            root: Object(defineProperty.a)(
              { color: app_pallete.primary[300] },
              '&.'.concat(checkboxClasses.a.checked),
              { color: app_pallete.primary[700] }
            )
          }
        },
        textField = {
          styleOverrides: {
            root: {
              '& label': {
                '&.Mui-focused': { color: app_pallete.primary[900] },
                '&.Mui-error': { color: app_pallete.error[500] },
                color: app_pallete.primary[500]
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: app_pallete.primary[500] },
                '&.Mui-focused ': {
                  '&.Mui-error fieldset': { borderColor: app_pallete.error[500] },
                  '& fieldset': { borderColor: app_pallete.primary[900] }
                }
              }
            }
          }
        },
        theme = Object(createTheme.a)({
          palette: app_pallete,
          typography: app_typography,
          components: {
            MuiSvgIcon: svgIcon,
            MuiButton: app_button,
            MuiCheckbox: app_checkbox_checkbox,
            MuiTextField: textField,
            MuiTooltip: app_tooltip
          }
        }),
        i18next = __webpack_require__('./node_modules/i18next/dist/esm/i18next.js'),
        context = __webpack_require__('./node_modules/react-i18next/dist/es/context.js'),
        common = __webpack_require__('./src/constants/translations/en/common.json'),
        errorPage = __webpack_require__('./src/constants/translations/en/errorPage.json'),
        en_button = __webpack_require__('./src/constants/translations/en/button.json'),
        header = __webpack_require__('./src/constants/translations/en/header.json'),
        login = __webpack_require__('./src/constants/translations/en/login.json'),
        questions = __webpack_require__('./src/constants/translations/en/questions.json'),
        titles = __webpack_require__('./src/constants/translations/en/titles.json'),
        guest_home_page = __webpack_require__('./src/constants/translations/en/guest-home-page.json'),
        student_home_page = __webpack_require__('./src/constants/translations/en/student-home-page.json'),
        cookie_policy_page = __webpack_require__('./src/constants/translations/en/cookie-policy-page.json'),
        translations = {
          en: {
            translations: {
              common: common,
              errorPage: errorPage,
              button: en_button,
              header: header,
              questions: questions,
              titles: titles,
              guestHomePage: guest_home_page,
              iconsTooltip: __webpack_require__('./src/constants/translations/en/iconsTooltip.json'),
              login: login,
              signup: __webpack_require__('./src/constants/translations/en/signup.json'),
              studentHomePage: student_home_page,
              cookiePolicyPage: cookie_policy_page,
              footer: __webpack_require__('./src/constants/translations/en/footer.json'),
              becomeTutor: __webpack_require__('./src/constants/translations/en/becomeTutor.json'),
              modals: __webpack_require__('./src/constants/translations/en/modals.json'),
              errors: __webpack_require__('./src/constants/translations/en/errors.json')
            }
          },
          ua: {
            translations: {
              common: __webpack_require__('./src/constants/translations/ua/common.json'),
              errorPage: __webpack_require__('./src/constants/translations/ua/errorPage.json'),
              button: __webpack_require__('./src/constants/translations/ua/button.json'),
              header: __webpack_require__('./src/constants/translations/ua/header.json'),
              questions: __webpack_require__('./src/constants/translations/ua/questions.json'),
              titles: __webpack_require__('./src/constants/translations/ua/titles.json'),
              login: __webpack_require__('./src/constants/translations/ua/login.json'),
              modals: __webpack_require__('./src/constants/translations/ua/modals.json')
            }
          }
        }
      i18next.a.use(context.e).init({ resources: translations, lng: 'en', ns: ['translations'] }),
        (i18next.a.languages = ['en', 'ua'])
      i18next.a
      var jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        parameters = {
          actions: { argTypesRegex: '^on[A-Z].*' },
          controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } }
        },
        decorators = [
          function (Story) {
            return Object(jsx_runtime.jsx)(ThemeProvider.a, {
              theme: theme,
              children: Object(jsx_runtime.jsx)(Story, {})
            })
          }
        ]
      function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object)
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object)
          enumerableOnly &&
            (symbols = symbols.filter(function (sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable
            })),
            keys.push.apply(keys, symbols)
        }
        return keys
      }
      function _defineProperty(obj, key, value) {
        return (
          key in obj
            ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 })
            : (obj[key] = value),
          obj
        )
      }
      Object.keys(preview_namespaceObject).forEach(function (key) {
        var value = preview_namespaceObject[key]
        switch (key) {
          case 'args':
            return Object(ClientApi.d)(value)
          case 'argTypes':
            return Object(ClientApi.b)(value)
          case 'decorators':
            return value.forEach(function (decorator) {
              return Object(ClientApi.f)(decorator, !1)
            })
          case 'loaders':
            return value.forEach(function (loader) {
              return Object(ClientApi.g)(loader, !1)
            })
          case 'parameters':
            return Object(ClientApi.h)(
              (function _objectSpread(target) {
                for (var i = 1; i < arguments.length; i++) {
                  var source = null != arguments[i] ? arguments[i] : {}
                  i % 2
                    ? ownKeys(Object(source), !0).forEach(function (key) {
                        _defineProperty(target, key, source[key])
                      })
                    : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
                    : ownKeys(Object(source)).forEach(function (key) {
                        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
                      })
                }
                return target
              })({}, value),
              !1
            )
          case 'argTypesEnhancers':
            return value.forEach(function (enhancer) {
              return Object(ClientApi.c)(enhancer)
            })
          case 'argsEnhancers':
            return value.forEach(function (enhancer) {
              return Object(ClientApi.e)(enhancer)
            })
          case 'render':
            return Object(ClientApi.i)(value)
          case 'globals':
          case 'globalTypes':
            var v = {}
            return (v[key] = value), Object(ClientApi.h)(v, !1)
          case '__namedExportsOrder':
          case 'decorateStory':
          case 'renderToDOM':
            return null
          default:
            return console.log(key + ' was not supported :( !')
        }
      })
    },
    './generated-stories-entry.js': function (module, exports, __webpack_require__) {
      'use strict'
      ;(function (module) {
        ;(0, __webpack_require__('./node_modules/@storybook/react/dist/esm/client/index.js').configure)(
          [
            __webpack_require__(
              './src sync recursive ^\\.(?:(?:^|\\/|(?:(?:(?!(?:^|\\/)\\.).)*?)\\/)(?!\\.)(?=.)[^/]*?\\.stories\\.mdx)$'
            ),
            __webpack_require__(
              './src sync recursive ^\\.(?:(?:^|\\/|(?:(?:(?!(?:^|\\/)\\.).)*?)\\/)(?!\\.)(?=.)[^/]*?\\.stories\\.(js|jsx|ts|tsx))$'
            )
          ],
          module,
          !1
        )
      }.call(this, __webpack_require__('./node_modules/webpack/buildin/module.js')(module)))
    },
    './src sync recursive ^\\.(?:(?:^|\\/|(?:(?:(?!(?:^|\\/)\\.).)*?)\\/)(?!\\.)(?=.)[^/]*?\\.stories\\.(js|jsx|ts|tsx))$':
      function (module, exports, __webpack_require__) {
        var map = {
          './stories/Accordion.stories.js': './src/stories/Accordion.stories.js',
          './stories/AccordionWithImage.stories.js': './src/stories/AccordionWithImage.stories.js',
          './stories/AppTextField.stories.jsx': './src/stories/AppTextField.stories.jsx',
          './stories/Button.stories.jsx': './src/stories/Button.stories.jsx',
          './stories/CarouselWithImage.stories.js': './src/stories/CarouselWithImage.stories.js',
          './stories/ConfirmDialog.stories.js': './src/stories/ConfirmDialog.stories.js',
          './stories/FileUploader.stories.js': './src/stories/FileUploader.stories.js',
          './stories/Header.stories.jsx': './src/stories/Header.stories.jsx',
          './stories/InfoCard.stories.js': './src/stories/InfoCard.stories.js',
          './stories/Page.stories.jsx': './src/stories/Page.stories.jsx',
          './stories/PopupDialog.stories.js': './src/stories/PopupDialog.stories.js',
          './stories/TitleWithDescription.stories.js': './src/stories/TitleWithDescription.stories.js',
          './stories/VideoBox.stories.js': './src/stories/VideoBox.stories.js'
        }
        function webpackContext(req) {
          var id = webpackContextResolve(req)
          return __webpack_require__(id)
        }
        function webpackContextResolve(req) {
          if (!__webpack_require__.o(map, req)) {
            var e = new Error("Cannot find module '" + req + "'")
            throw ((e.code = 'MODULE_NOT_FOUND'), e)
          }
          return map[req]
        }
        ;(webpackContext.keys = function webpackContextKeys() {
          return Object.keys(map)
        }),
          (webpackContext.resolve = webpackContextResolve),
          (module.exports = webpackContext),
          (webpackContext.id =
            './src sync recursive ^\\.(?:(?:^|\\/|(?:(?:(?!(?:^|\\/)\\.).)*?)\\/)(?!\\.)(?=.)[^/]*?\\.stories\\.(js|jsx|ts|tsx))$')
      },
    './src sync recursive ^\\.(?:(?:^|\\/|(?:(?:(?!(?:^|\\/)\\.).)*?)\\/)(?!\\.)(?=.)[^/]*?\\.stories\\.mdx)$':
      function (module, exports) {
        function webpackEmptyContext(req) {
          var e = new Error("Cannot find module '" + req + "'")
          throw ((e.code = 'MODULE_NOT_FOUND'), e)
        }
        ;(webpackEmptyContext.keys = function () {
          return []
        }),
          (webpackEmptyContext.resolve = webpackEmptyContext),
          (module.exports = webpackEmptyContext),
          (webpackEmptyContext.id =
            './src sync recursive ^\\.(?:(?:^|\\/|(?:(?:(?!(?:^|\\/)\\.).)*?)\\/)(?!\\.)(?=.)[^/]*?\\.stories\\.mdx)$')
      },
    './src/assets/img/guest-home-page/map.svg': function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_exports__.a = __webpack_require__.p + 'static/media/map.6a478a0e.svg'
    },
    './src/components/accordion/Accordions.js': function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      var Typography = __webpack_require__('./node_modules/@mui/material/Typography/Typography.js'),
        useTranslation = __webpack_require__('./node_modules/react-i18next/dist/es/useTranslation.js'),
        Box = __webpack_require__('./node_modules/@mui/system/esm/Box/Box.js'),
        Accordion = __webpack_require__('./node_modules/@mui/material/Accordion/Accordion.js'),
        AccordionSummary = __webpack_require__('./node_modules/@mui/material/AccordionSummary/AccordionSummary.js'),
        AccordionDetails = __webpack_require__('./node_modules/@mui/material/AccordionDetails/AccordionDetails.js'),
        ExpandMoreRounded = __webpack_require__('./node_modules/@mui/icons-material/ExpandMoreRounded.js'),
        ExpandMoreRounded_default = __webpack_require__.n(ExpandMoreRounded),
        commonShadow = '0px 3px 16px 2px rgba(144, 164, 174, 0.12)',
        style = {
          noShowMoreIcon: {
            root: { maxWidth: { md: '360px', sm: '229px' } },
            accordion: { borderRadius: '6px', mb: { md: '16px', sm: '8px' } },
            inactive: {
              boxShadow: 'none',
              '&:hover': { backgroundColor: 'primary.50', borderRadius: '6px' },
              '&::before': { display: 'none' }
            },
            title: {
              fontSize: { md: '20px', sm: '13px' },
              lineHeight: { md: '28px', sm: '18px' },
              color: 'primary.900'
            },
            description: {
              fontSize: { md: '14px', sm: '8px' },
              lineHeight: { md: '24px', sm: '12px' },
              color: 'basic.white'
            },
            active: {
              backgroundColor: 'primary.800',
              boxShadow:
                '0px 5px 6px -3px rgba(144, 164, 174, 0.2), 0px 9px 12px 1px rgba(144, 164, 174, 0.14), 0px 3px 16px 2px rgba(144, 164, 174, 0.12)',
              '& h6': { color: 'basic.white' }
            }
          },
          withShowMoreIcon: {
            root: { maxWidth: '928px', mt: '18px' },
            accordion: { mb: 2 },
            inactive: {
              boxShadow: commonShadow,
              '&:hover': { boxShadow: '0px 3px 16px 2px rgba(144, 164, 174, 0.56)' },
              '&::before': { display: 'none' }
            },
            summary: { p: { xs: '0 16px', sm: '0 32px' }, '& .MuiAccordionSummary-content': { m: '24px 0' } },
            title: { color: 'primary.900' },
            details: { p: { xs: '0 16px', sm: '0 32px' } },
            description: { pb: '24px', color: 'primary.900', typography: 'body2', fontWeight: 400 },
            active: {
              boxShadow: commonShadow,
              backgroundColor: 'basic.white',
              '& h6': { color: 'primary.900' },
              '&:hover': { boxShadow: '0px 3px 16px 2px rgba(144, 164, 174, 0.56)' }
            }
          }
        },
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        Accordions_Accordions = function Accordions(_ref) {
          var items = _ref.items,
            _onChange = _ref.onChange,
            activeIndex = _ref.activeIndex,
            showMoreIcon = _ref.showMoreIcon,
            square = _ref.square,
            t = Object(useTranslation.a)().t,
            accordionStyle = style[showMoreIcon ? 'withShowMoreIcon' : 'noShowMoreIcon']
          return Object(jsx_runtime.jsx)(Box.a, {
            sx: accordionStyle.root,
            children: items.map(function (item, index) {
              return Object(jsx_runtime.jsxs)(
                Accordion.a,
                {
                  'data-testid': ''.concat(index, '-').concat(activeIndex === index),
                  disableGutters: !0,
                  expanded: activeIndex === index,
                  onChange: function onChange() {
                    return _onChange(index)
                  },
                  square: square,
                  sx: [
                    accordionStyle.accordion,
                    activeIndex === index ? accordionStyle.active : accordionStyle.inactive
                  ],
                  children: [
                    Object(jsx_runtime.jsx)(AccordionSummary.a, {
                      expandIcon: showMoreIcon && Object(jsx_runtime.jsx)(ExpandMoreRounded_default.a, {}),
                      sx: accordionStyle.summary,
                      children: Object(jsx_runtime.jsx)(Typography.a, {
                        sx: accordionStyle.title,
                        variant: 'h6',
                        children: t(item.title)
                      })
                    }),
                    Object(jsx_runtime.jsx)(AccordionDetails.a, {
                      sx: accordionStyle.details,
                      children: Object(jsx_runtime.jsx)(Typography.a, {
                        sx: accordionStyle.description,
                        variant: 'body1',
                        children: t(item.description)
                      })
                    })
                  ]
                },
                index
              )
            })
          })
        }
      Accordions_Accordions.__docgenInfo = { description: '', methods: [], displayName: 'Accordions' }
      __webpack_exports__.a = Accordions_Accordions
      'undefined' != typeof STORYBOOK_REACT_CLASSES &&
        (STORYBOOK_REACT_CLASSES['src/components/accordion/Accordions.js'] = {
          name: 'Accordions',
          docgenInfo: Accordions_Accordions.__docgenInfo,
          path: 'src/components/accordion/Accordions.js'
        })
    },
    './src/components/confirm-dialog/ConfirmDialog.js': function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      var useTranslation = __webpack_require__('./node_modules/react-i18next/dist/es/useTranslation.js'),
        Dialog = __webpack_require__('./node_modules/@mui/material/Dialog/Dialog.js'),
        Typography = __webpack_require__('./node_modules/@mui/material/Typography/Typography.js'),
        IconButton = __webpack_require__('./node_modules/@mui/material/IconButton/IconButton.js'),
        DialogContent = __webpack_require__('./node_modules/@mui/material/DialogContent/DialogContent.js'),
        DialogActions = __webpack_require__('./node_modules/@mui/material/DialogActions/DialogActions.js'),
        Button = __webpack_require__('./node_modules/@mui/material/Button/Button.js'),
        Close = __webpack_require__('./node_modules/@mui/icons-material/Close.js'),
        Close_default = __webpack_require__.n(Close),
        style = {
          root: { minWidth: { xs: '280px', sm: '400px' } },
          icon: { position: 'absolute', right: 16, top: 16, p: 0 },
          title: { p: '13px 16px' },
          content: { p: 2 },
          actions: { p: '12px' }
        },
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        ConfirmDialog_ConfirmDialog = function ConfirmDialog(_ref) {
          var message = _ref.message,
            title = _ref.title,
            open = _ref.open,
            onConfirm = _ref.onConfirm,
            onDismiss = _ref.onDismiss,
            t = Object(useTranslation.a)().t
          return Object(jsx_runtime.jsxs)(Dialog.a, {
            PaperProps: { sx: style.root },
            'data-testid': 'confirmDialog',
            onClose: onDismiss,
            open: open,
            children: [
              Object(jsx_runtime.jsx)(Typography.a, { sx: style.title, variant: 'h6', children: t(title) }),
              Object(jsx_runtime.jsx)(IconButton.a, {
                onClick: onDismiss,
                sx: style.icon,
                children: Object(jsx_runtime.jsx)(Close_default.a, {})
              }),
              Object(jsx_runtime.jsx)(DialogContent.a, {
                dividers: !0,
                sx: style.content,
                children: Object(jsx_runtime.jsx)(Typography.a, { variant: 'subtitle1', children: t(message) })
              }),
              Object(jsx_runtime.jsxs)(DialogActions.a, {
                sx: style.actions,
                children: [
                  Object(jsx_runtime.jsx)(Button.a, {
                    onClick: onConfirm,
                    size: 'large',
                    variant: 'tonal',
                    children: t('common.yes')
                  }),
                  Object(jsx_runtime.jsx)(Button.a, {
                    onClick: onDismiss,
                    size: 'large',
                    variant: 'contained',
                    children: t('common.no')
                  })
                ]
              })
            ]
          })
        }
      ConfirmDialog_ConfirmDialog.__docgenInfo = { description: '', methods: [], displayName: 'ConfirmDialog' }
      __webpack_exports__.a = ConfirmDialog_ConfirmDialog
      'undefined' != typeof STORYBOOK_REACT_CLASSES &&
        (STORYBOOK_REACT_CLASSES['src/components/confirm-dialog/ConfirmDialog.js'] = {
          name: 'ConfirmDialog',
          docgenInfo: ConfirmDialog_ConfirmDialog.__docgenInfo,
          path: 'src/components/confirm-dialog/ConfirmDialog.js'
        })
    },
    './src/components/title-with-description/TitleWithDescription.js': function (
      module,
      __webpack_exports__,
      __webpack_require__
    ) {
      'use strict'
      var objectSpread2 = __webpack_require__(
          './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js'
        ),
        Box = __webpack_require__('./node_modules/@mui/material/Box/Box.js'),
        Typography = __webpack_require__('./node_modules/@mui/material/Typography/Typography.js'),
        styles = {
          wrapper: { maxWidth: '1128px', margin: '0 auto', marginBottom: '32px', textAlign: 'center' },
          title: { marginBottom: '16px' }
        },
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        TitleWithDescription_TitleWithDescription = function TitleWithDescription(_ref) {
          var title = _ref.title,
            titleStyles = _ref.titleStyles,
            description = _ref.description,
            descriptionStyles = _ref.descriptionStyles,
            _ref$style = _ref.style,
            style = void 0 === _ref$style ? styles : _ref$style,
            componentStyles = _ref.componentStyles
          return Object(jsx_runtime.jsxs)(Box.a, {
            sx: Object(objectSpread2.a)(Object(objectSpread2.a)({}, style.wrapper), componentStyles),
            children: [
              Object(jsx_runtime.jsx)(Typography.a, {
                sx: Object(objectSpread2.a)(Object(objectSpread2.a)({}, titleStyles), style.title),
                children: title
              }),
              Object(jsx_runtime.jsx)(Typography.a, {
                sx: Object(objectSpread2.a)(Object(objectSpread2.a)({}, descriptionStyles), style.description),
                children: description
              })
            ]
          })
        }
      TitleWithDescription_TitleWithDescription.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'TitleWithDescription',
        props: { style: { defaultValue: { value: 'styles', computed: !0 }, required: !1 } }
      }
      __webpack_exports__.a = TitleWithDescription_TitleWithDescription
      'undefined' != typeof STORYBOOK_REACT_CLASSES &&
        (STORYBOOK_REACT_CLASSES['src/components/title-with-description/TitleWithDescription.js'] = {
          name: 'TitleWithDescription',
          docgenInfo: TitleWithDescription_TitleWithDescription.__docgenInfo,
          path: 'src/components/title-with-description/TitleWithDescription.js'
        })
    },
    './src/constants/translations/en/becomeTutor.json': function (module) {
      module.exports = JSON.parse(
        '{"generalInfo":{"title":"Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.","checkboxLabel":"I confirm that I am over 18 years old"},"documents":{"imageAlt":"graduate student","description":"To download certificates, drag certificates to the square or click the \\"Upload your certificate\\" button. Use only .pdf/.png/.jpeg files. You can add maximum 8 certificates.","button":"Upload your certificate","typeError":"Wrong file type. Only .pdf/.png/.jpg/.jpeg files are allowed.","allFilesSizeError":"Size of all certificates cannot be more than 50MB.","fileSizeError":"Size for one file cannot be more than 10MB."},"experience":{"title":"Describe your professional experience. Minimum 200 characters.","textFieldLabel":"Text here"}}'
      )
    },
    './src/constants/translations/en/button.json': function (module) {
      module.exports = JSON.parse('{"toMain":"Home Page","goToLogin":"Go to Login"}')
    },
    './src/constants/translations/en/common.json': function (module) {
      module.exports = JSON.parse(
        '{"title":"space2","about":"About us","yes":"Yes","no":"No","back":"Back","next":"Next","finish":"Finish","labels":{"email":"Email","firstName":"First name","lastName":"Last name","password":"Password","confirmPassword":"Confirm password","terms":"Terms","privacyPolicy":"Privacy Policy","login":"Login","signup":"Sign up","country":"Country","city":"City"},"errorMessages":{"emailValid":"Email should be of the following format: “local-part@domain.com”","passwordLength":"Password cannot be shorter than 8 and longer than 25 characters","passwordValid":"Password must contain at least one alphabetic and one numeric character","emptyField":"This field cannot be empty","nameLength":"This field cannot be longer than 30 characters","nameAlphabeticOnly":"This field can contain alphabetic characters only","passwordsDontMatch":"Passwords do not match","shortText":"This text is too short","longText":"This text is too long"}}'
      )
    },
    './src/constants/translations/en/cookie-policy-page.json': function (module) {
      module.exports = JSON.parse(
        '{"cookiePolicy":{"title":"Cookie Policy for SpaceToStudy","description":"This is the Cookie Policy for SpaceToStudy, accessible from SpaceToStudy.com.ua"},"whatAreCookies":{"title":"What Are Cookies","description":"As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or \'break\' certain elements of the site`s functionality."},"howWeUseCookies":{"title":"How We Use Cookies","description":"We use cookies for a variety of reasons detailed below. Unfortunately, in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case, they are used to provide a service that you use."},"disablingCookies":{"title":"Disabling Cookies","description":"You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site. Therefore, it is recommended that you do not disable cookies."},"theCookiesWeSet":{"title":"The Cookies We Set","account":{"title":"Account related cookies","description":"If you create an account with us, then we will use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out however in some cases, they may remain afterwards to remember your site preferences when logged out."},"login":{"title":"Login related cookies","description":"We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page. These cookies are typically removed or cleared when you log out to ensure that you can only access restricted features and areas when logged in."},"site":{"title":"Site preferences cookies","description":"In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences, we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences."}},"thirdPartyCookies":{"title":"Third Party Cookies","description":"In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.","subtitle":"From time to time, we test new features and make subtle changes to the way that the site is delivered. When we are still testing new features, these cookies may be used to ensure that you receive a consistent experience whilst on the site whilst ensuring we understand which optimizations our users appreciate the most."},"moreInformation":{"title":"More Information","subtitle":"Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren\'t sure whether you need or not it\'s usually safer to leave cookies enabled in case it does interact with one of the features you use on our site. However, if you are still looking for more information, then you can contact us by visiting this link info@spacetostudy.com"}}'
      )
    },
    './src/constants/translations/en/errorPage.json': function (module) {
      module.exports = JSON.parse(
        '{"400":{"title":"Bad request","description":"The server was unable to process your request due to invalid syntax. We suggest you go back to the home page."},"401":{"title":"Authorization error","description":"Incorrect authorization or authentication of the user on the server side, or when accessing a specific URL. We suggest you go to the home page."},"404":{"title":"Page Not Found","description":"We are sorry, but the page you were trying to find does\\nnot exist. We suggest you go to the home page."},"500":{"title":"Internal Server Error","description":"We are sorry, the server encountered an unexpected error that prevented it from executing the request. We suggest you go to the home page. Report an error."}}'
      )
    },
    './src/constants/translations/en/errors.json': function (module) {
      module.exports = JSON.parse(
        '{"USER_NOT_REGISTERED":"User is not registered","INCORRECT_CREDENTIALS":"Your email or password is incorrect","ROLE_NOT_SUPPORTED":"User role is not supported","ALREADY_REGISTERED":"An account with this email already exists","EMAIL_ALREADY_CONFIRMED":"User with this email is already confirmed","EMAIL_NOT_CONFIRMED":"Please confirm your email to login","NOT_FOUND":"User has not been found","BAD_REFRESH_TOKEN":"You have be logged out, please sign in again","UNAUTHORIZED":"User is not authorized","EMAIL_NOT_FOUND":"There is no user registered with that email"}'
      )
    },
    './src/constants/translations/en/footer.json': function (module) {
      module.exports = JSON.parse(
        '{"allRightsReserved":"© 2022 All rights reserved","privacyPolicy":"Privacy Policy","termOfUse":"Term of Use"}'
      )
    },
    './src/constants/translations/en/guest-home-page.json': function (module) {
      module.exports = JSON.parse(
        '{"welcomeBlock":{"description":"An educational platform that offers professional courses in It is a long established fact that a reader will be distracted by the readable content of","getStarted":"Get started for free"},"accordion":{"flexibleLocation":{"title":"Flexible Location","description":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},"individualTime":{"title":"Individual Time","description":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},"freeChoiceOfTeachers":{"title":"Free Choice of Teachers","description":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},"digitalCommunication":{"title":"Digital Communication","description":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."}},"whatCanYouDo":{"title":"What can you do","description":"Whether you’re looking for a tutor or to looking become one – you’ve come to the right place.","learn":{"title":"Learn from experts","description":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.established fact that a reader will be ","actionLabel":"Start learning today"},"teach":{"title":"Share your experience","description":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.established fact that a reader will be ","actionLabel":"Become a mentor"}},"howItWorks":{"title":"How It Works","learnFromExperts":"Learn from Experts","shareYourExperience":"Share your Experience","student":{"signUp":{"title":"Sign Up","description":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},"selectAMentor":{"title":"Select a Mentor","description":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},"sendRequest":{"title":"Send Request","description":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},"startLearning":{"title":"Start Learning","description":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."}},"mentor":{"signUp":{"title":"Sign Up","description":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},"createAMentorAccount":{"title":"Create a Mentor Account","description":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},"getNewStudents":{"title":"Get New Students","description":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."},"receiveFeedbacks":{"title":"Receive Feedbacks","description":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."}}},"whoWeAre":{"title":"Who we are","description":"Space to Study - an educational platform that offersIt a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed."}}'
      )
    },
    './src/constants/translations/en/header.json': function (module) {
      module.exports = JSON.parse(
        '{"whatCanYouDo":"What can you do","howItWorks":"How it works","whoWeAre":"Who we are","findMentor":"Mentors","categories":"Categories","faq":"FAQ","becomeMentor":"Become a mentor","loginButton":"Login"}'
      )
    },
    './src/constants/translations/en/iconsTooltip.json': function (module) {
      module.exports = JSON.parse(
        '{"language":"Language","messages":"Messages","favorites":"Favorites","notifications":"Notifications","account":"Account","menu":"Menu","login":"Login"}'
      )
    },
    './src/constants/translations/en/login.json': function (module) {
      module.exports = JSON.parse(
        '{"head":"Welcome back","rememberMe":"Remember me","forgotPassword":"Forgot password?","googleButton":"Login with Google","continue":"or continue","haveAccount":"Don`t have an account yet?","joinUs":"Join us for free","enterEmail":"Enter the email address associated with your account and we`ll send you a link to reset your password.","sendPassword":"Send me password reset link","backToLogin":"Back to Log in","passwordReset":"Password Reset","weSentEmail":"We`ve sent you an email with a password reset link to: \\n","emailArrive":" If the email didn\'t arrive, give it a few minutes and check back. If it isn`t still there, check your spam folder."}'
      )
    },
    './src/constants/translations/en/modals.json': function (module) {
      module.exports = JSON.parse(
        '{"emailConfirm":"Your email has been successfully verified!","emailNotConfirm":"Your email address has not been verified!","emailReject-badToken":"The confirm token is either invalid or has expired.","emailReject-alreadyConfirmed":"User email has been already confirmed."}'
      )
    },
    './src/constants/translations/en/questions.json': function (module) {
      module.exports = JSON.parse('{"confirmation":"Do you want to exit this page?"}')
    },
    './src/constants/translations/en/signup.json': function (module) {
      module.exports = JSON.parse(
        '{"head":{"mentor":"Sign up as a mentor","student":"Sign up as a student"},"iAgree":"I agree to the","and":"and","googleButton":"Sign up with Google","continue":"or continue","haveAccount":"Already have a mentor account?","joinUs":"Login!","confirmEmailTitle":"Your email address needs to be verified","confirmEmailMessage":"We sent a confirmation email to: ","confirmEmailDesc":" Check your email and click on the confirmation button to continue."}'
      )
    },
    './src/constants/translations/en/student-home-page.json': function (module) {
      module.exports = JSON.parse(
        '{"findMentorBlock":{"title":"A Global Network of Tutors","description":"A Space2Study platform is a place where you can learn from the best. Type what would you like to learn and find the best mentor for that.","label":"What would you like to learn","button":"Find mentor"},"popularCategories":{"title":"Popular Categories","description":"Explore subjects you\'re passionate about.","viewMore":"View more"},"howItWorks":{"title":"How It Works","description":"4 steps to easy and funny learning with Space2Study","selectAMentor":{"title":"Select a Mentor","description":"Choose your perfect tutor from over 10 000 teachers from all over the world."},"sendRequest":{"title":"Send Request","description":"Describe what you would like to study and send a request to the mentor."},"startLearning":{"title":"Start Learning","description":"Describe what you would like to study and send a request to the mentor."},"writeFeedback":{"title":"Write Feedback","description":"Describe what you would like to study and send a request to the mentor."}},"faq":{"title":"Frequently Asked Questions","subtitle":"Everything you need to know about learning journey in Space2Study as a student","findTutor":"How to find a tutor","findTutorDesription":"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English.","bookLeson":"How to book a lesson","rules":"Rules for students","howPayLesons":"How you can pay for lessons"}}'
      )
    },
    './src/constants/translations/en/titles.json': function (module) {
      module.exports = JSON.parse('{"confirmTitle":"Confirmation"}')
    },
    './src/constants/translations/ua/button.json': function (module) {
      module.exports = JSON.parse('{"toMain":"На Головну","goToLogin":"Перейти до Входу"}')
    },
    './src/constants/translations/ua/common.json': function (module) {
      module.exports = JSON.parse('{"title":"Study space","about":"Про нас","yes":"Так","no":"Ні"}')
    },
    './src/constants/translations/ua/errorPage.json': function (module) {
      module.exports = JSON.parse(
        '{"authTitle":"Помилка\\nавторизації","authText":"Невірна авторизація чи аутентифікація користувача на\\nстороні сервера чи при зверненні до певної url-адреси.\\nПропонуємо вам перейти на головну сторінку."}'
      )
    },
    './src/constants/translations/ua/header.json': function (module) {
      module.exports = JSON.parse(
        '{"guestNavBar":{"whatCanYouDo":"Що ти можеш","howItWorks":"Як це працює","whoWeAre":"Про нас"},"loginButton":"Увійти"}'
      )
    },
    './src/constants/translations/ua/login.json': function (module) {
      module.exports = JSON.parse(
        '{"head":"Welcome back","email":"Email","password":"Password","rememberMe":"Remember me","forgotPassword":"Forgot password?","loginButton":"Login","googleButton":"Login with Google","continue":"or continue","haveAccount":"Don`t have an account yet?","joinUs":"Join us for free"}'
      )
    },
    './src/constants/translations/ua/modals.json': function (module) {
      module.exports = JSON.parse(
        '{"emailConfirm":"Ваш email успішно перевірено!","emailNotConfirm":"Ваш email не перевірено!","emailReject-badToken":"Токен підтвердження або недійсний, або термін його дії минув.","emailReject-alreadyConfirmed":"Електронну адресу користувача вже підтверджено."}'
      )
    },
    './src/constants/translations/ua/questions.json': function (module) {
      module.exports = JSON.parse('{"confirmation":"Ви впевнені, що хочете вийти?"}')
    },
    './src/constants/translations/ua/titles.json': function (module) {
      module.exports = JSON.parse('{"confirmTitle":"Підтведрдіть вихід"}')
    },
    './src/stories/Accordion.stories.js': function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'Desktop', function () {
          return Desktop
        })
      var _Users_viktor_ishchenko_work_SpaceToStudy_Client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js'
          ),
        _components_accordion_Accordions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './src/components/accordion/Accordions.js'
        ),
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__('./node_modules/react/jsx-runtime.js')
      __webpack_exports__.default = {
        title: 'Accordion',
        component: _components_accordion_Accordions__WEBPACK_IMPORTED_MODULE_1__.a,
        argTypes: {
          activeIndex: { type: 'number', description: 'The index of the active item in the accordion' },
          showMoreIcon: { type: 'boolean', description: 'Whether to show more icon' },
          square: { type: 'boolean', description: 'If true, rounded corners are disabled' },
          items: { type: 'array', description: 'Array of accordion items to show' },
          onChange: { type: 'function', description: 'Function to be called when the accordion item is changed' }
        }
      }
      var Desktop = function Template(args) {
        return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
          _components_accordion_Accordions__WEBPACK_IMPORTED_MODULE_1__.a,
          Object(
            _Users_viktor_ishchenko_work_SpaceToStudy_Client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a
          )({}, args)
        )
      }.bind({})
      ;(Desktop.args = {
        activeIndex: 0,
        showMoreIcon: !1,
        square: !0,
        items: [
          { title: 'Title 1', description: 'Description 1' },
          { title: 'Title 2', description: 'Description 2' }
        ],
        onChange: void 0
      }),
        (Desktop.parameters = Object(
          _Users_viktor_ishchenko_work_SpaceToStudy_Client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a
        )({ storySource: { source: '(args) => <Accordions {...args} />' } }, Desktop.parameters))
    },
    './src/stories/AccordionWithImage.stories.js': function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'Default', function () {
          return Default
        })
      var objectSpread2 = __webpack_require__(
          './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js'
        ),
        slicedToArray = __webpack_require__(
          './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js'
        ),
        Accordions = __webpack_require__('./src/components/accordion/Accordions.js'),
        Box = __webpack_require__('./node_modules/@mui/system/esm/Box/Box.js'),
        react = __webpack_require__('./node_modules/react/index.js'),
        style = {
          feature: { px: '24px', overflow: 'auto' },
          image: { maxHeight: '470px', overflow: 'auto', mr: '24px' }
        },
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        AccordionWithImage_AccordionWithImage = function AccordionWithImage(_ref) {
          var items = _ref.items,
            _useState = Object(react.useState)(0),
            _useState2 = Object(slicedToArray.a)(_useState, 2),
            activeItemId = _useState2[0],
            setActiveItemId = _useState2[1]
          return Object(jsx_runtime.jsxs)(Box.a, {
            className: 'section',
            'data-testid': 'accordion',
            sx: style.feature,
            children: [
              Object(jsx_runtime.jsx)(Box.a, { component: 'img', src: items[activeItemId].image, sx: style.image }),
              Object(jsx_runtime.jsx)(Accordions.a, {
                activeIndex: activeItemId,
                items: items,
                onChange: function onChange(id) {
                  return setActiveItemId(id)
                },
                style: style.accordions
              })
            ]
          })
        }
      AccordionWithImage_AccordionWithImage.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'AccordionWithImage'
      }
      var accordion_with_image_AccordionWithImage = AccordionWithImage_AccordionWithImage
      'undefined' != typeof STORYBOOK_REACT_CLASSES &&
        (STORYBOOK_REACT_CLASSES['src/components/accordion-with-image/AccordionWithImage.js'] = {
          name: 'AccordionWithImage',
          docgenInfo: AccordionWithImage_AccordionWithImage.__docgenInfo,
          path: 'src/components/accordion-with-image/AccordionWithImage.js'
        })
      var map = __webpack_require__('./src/assets/img/guest-home-page/map.svg'),
        Default =
          ((__webpack_exports__.default = {
            title: 'AccordionWithImage',
            component: accordion_with_image_AccordionWithImage,
            argTypes: { items: { type: 'array', description: 'Array of accordionWithImage items to show' } }
          }),
          function Template(args) {
            return Object(jsx_runtime.jsx)(accordion_with_image_AccordionWithImage, Object(objectSpread2.a)({}, args))
          }.bind({}))
      ;(Default.args = {
        items: [
          { image: map.a, title: 'Title 1', description: 'Description 1' },
          { image: map.a, title: 'Title 2', description: 'Description 2' },
          { image: map.a, title: 'Title 3', description: 'Description 3' },
          { image: map.a, title: 'Title 4', description: 'Description 4' }
        ]
      }),
        (Default.parameters = Object(objectSpread2.a)(
          { storySource: { source: '(args) => <AccordionWithImage {...args} />' } },
          Default.parameters
        ))
    },
    './src/stories/AppTextField.stories.jsx': function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'AppTextFieldWithError', function () {
          return AppTextFieldWithError
        })
      var objectSpread2 = __webpack_require__(
          './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js'
        ),
        objectWithoutProperties = __webpack_require__(
          './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js'
        ),
        Tooltip = __webpack_require__('./node_modules/@mui/material/Tooltip/Tooltip.js'),
        Typography = __webpack_require__('./node_modules/@mui/material/Typography/Typography.js'),
        TextField = __webpack_require__('./node_modules/@mui/material/TextField/TextField.js'),
        style = { helperText: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } },
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        _excluded = ['errorMsg'],
        AppTextField_AppTextField = function AppTextField(_ref) {
          var errorMsg = _ref.errorMsg,
            props = Object(objectWithoutProperties.a)(_ref, _excluded),
            helperText = errorMsg
              ? Object(jsx_runtime.jsx)(Tooltip.a, {
                  title: errorMsg,
                  children: Object(jsx_runtime.jsx)(Typography.a, { variant: 'caption', children: errorMsg })
                })
              : ' '
          return Object(jsx_runtime.jsx)(
            TextField.a,
            Object(objectSpread2.a)(
              { FormHelperTextProps: { sx: style.helperText }, error: Boolean(errorMsg), helperText: helperText },
              props
            )
          )
        }
      AppTextField_AppTextField.__docgenInfo = { description: '', methods: [], displayName: 'AppTextField' }
      var app_text_field_AppTextField = AppTextField_AppTextField
      'undefined' != typeof STORYBOOK_REACT_CLASSES &&
        (STORYBOOK_REACT_CLASSES['src/components/app-text-field/AppTextField.js'] = {
          name: 'AppTextField',
          docgenInfo: AppTextField_AppTextField.__docgenInfo,
          path: 'src/components/app-text-field/AppTextField.js'
        })
      __webpack_exports__.default = {
        title: 'AppTextField',
        component: app_text_field_AppTextField,
        argTypes: { errorMsg: { type: 'string', description: 'If passed, error message is shown' } },
        parameters: {
          componentSubtitle: Object(jsx_runtime.jsx)('a', {
            href: 'https://design-system.aurora.io/?path=/story/material-ui-textfield-including-select--basic',
            target: '_blank',
            children: 'Full API'
          })
        }
      }
      var AppTextFieldWithError = function Template(args) {
        return Object(jsx_runtime.jsx)(app_text_field_AppTextField, Object(objectSpread2.a)({}, args))
      }.bind({})
      ;(AppTextFieldWithError.args = { errorMsg: 'This field cannot be empty' }),
        (AppTextFieldWithError.parameters = Object(objectSpread2.a)(
          { storySource: { source: '(args) => <AppTextField {...args} />' } },
          AppTextFieldWithError.parameters
        ))
    },
    './src/stories/Button.jsx': function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.d(__webpack_exports__, 'a', function () {
        return Button
      })
      var _Users_viktor_ishchenko_work_SpaceToStudy_Client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js'
          ),
        _Users_viktor_ishchenko_work_SpaceToStudy_Client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js'
          ),
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ =
          (__webpack_require__('./node_modules/react/index.js'),
          __webpack_require__('./src/stories/button.css'),
          __webpack_require__('./node_modules/react/jsx-runtime.js')),
        _excluded = ['primary', 'backgroundColor', 'size', 'label'],
        Button = function Button(_ref) {
          var primary = _ref.primary,
            backgroundColor = _ref.backgroundColor,
            size = _ref.size,
            label = _ref.label,
            props = Object(
              _Users_viktor_ishchenko_work_SpaceToStudy_Client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__.a
            )(_ref, _excluded),
            mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary'
          return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
            'button',
            Object(
              _Users_viktor_ishchenko_work_SpaceToStudy_Client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a
            )(
              Object(
                _Users_viktor_ishchenko_work_SpaceToStudy_Client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a
              )(
                {
                  type: 'button',
                  className: ['storybook-button', 'storybook-button--'.concat(size), mode].join(' '),
                  style: backgroundColor && { backgroundColor: backgroundColor }
                },
                props
              ),
              {},
              { children: label }
            )
          )
        }
      ;(Button.defaultProps = { backgroundColor: null, primary: !1, size: 'medium', onClick: void 0 }),
        (Button.__docgenInfo = {
          description: 'Primary UI component for user interaction',
          methods: [],
          displayName: 'Button',
          props: {
            backgroundColor: {
              defaultValue: { value: 'null', computed: !1 },
              description: 'What background color to use',
              type: { name: 'string' },
              required: !1
            },
            primary: {
              defaultValue: { value: 'false', computed: !1 },
              description: 'Is this the principal call to action on the page?',
              type: { name: 'bool' },
              required: !1
            },
            size: {
              defaultValue: { value: "'medium'", computed: !1 },
              description: 'How large should the button be?',
              type: {
                name: 'enum',
                value: [
                  { value: "'small'", computed: !1 },
                  { value: "'medium'", computed: !1 },
                  { value: "'large'", computed: !1 }
                ]
              },
              required: !1
            },
            onClick: {
              defaultValue: { value: 'undefined', computed: !0 },
              description: 'Optional click handler',
              type: { name: 'func' },
              required: !1
            },
            label: { description: 'Button contents', type: { name: 'string' }, required: !0 }
          }
        }),
        'undefined' != typeof STORYBOOK_REACT_CLASSES &&
          (STORYBOOK_REACT_CLASSES['src/stories/Button.jsx'] = {
            name: 'Button',
            docgenInfo: Button.__docgenInfo,
            path: 'src/stories/Button.jsx'
          })
    },
    './src/stories/Button.stories.jsx': function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'Primary', function () {
          return Primary
        }),
        __webpack_require__.d(__webpack_exports__, 'Secondary', function () {
          return Secondary
        }),
        __webpack_require__.d(__webpack_exports__, 'Large', function () {
          return Large
        }),
        __webpack_require__.d(__webpack_exports__, 'Small', function () {
          return Small
        })
      var _Users_viktor_ishchenko_work_SpaceToStudy_Client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js'
          ),
        _Button__WEBPACK_IMPORTED_MODULE_2__ =
          (__webpack_require__('./node_modules/react/index.js'), __webpack_require__('./src/stories/Button.jsx')),
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__('./node_modules/react/jsx-runtime.js')
      __webpack_exports__.default = {
        title: 'Example/Button',
        component: _Button__WEBPACK_IMPORTED_MODULE_2__.a,
        argTypes: { backgroundColor: { control: 'color' } }
      }
      var Template = function Template(args) {
          return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(
            _Button__WEBPACK_IMPORTED_MODULE_2__.a,
            Object(
              _Users_viktor_ishchenko_work_SpaceToStudy_Client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a
            )({}, args)
          )
        },
        Primary = Template.bind({})
      Primary.args = { primary: !0, label: 'Button' }
      var Secondary = Template.bind({})
      Secondary.args = { label: 'Button' }
      var Large = Template.bind({})
      Large.args = { size: 'large', label: 'Button' }
      var Small = Template.bind({})
      ;(Small.args = { size: 'small', label: 'Button' }),
        (Primary.parameters = Object(
          _Users_viktor_ishchenko_work_SpaceToStudy_Client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a
        )({ storySource: { source: '(args) => <Button {...args} />' } }, Primary.parameters)),
        (Secondary.parameters = Object(
          _Users_viktor_ishchenko_work_SpaceToStudy_Client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a
        )({ storySource: { source: '(args) => <Button {...args} />' } }, Secondary.parameters)),
        (Large.parameters = Object(
          _Users_viktor_ishchenko_work_SpaceToStudy_Client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a
        )({ storySource: { source: '(args) => <Button {...args} />' } }, Large.parameters)),
        (Small.parameters = Object(
          _Users_viktor_ishchenko_work_SpaceToStudy_Client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a
        )({ storySource: { source: '(args) => <Button {...args} />' } }, Small.parameters))
    },
    './src/stories/CarouselWithImage.stories.js': function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'Default', function () {
          return Default
        })
      var objectSpread2 = __webpack_require__(
          './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js'
        ),
        slicedToArray = __webpack_require__(
          './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js'
        ),
        react = __webpack_require__('./node_modules/react/index.js'),
        Box = __webpack_require__('./node_modules/@mui/material/Box/Box.js'),
        useTranslation = __webpack_require__('./node_modules/react-i18next/dist/es/useTranslation.js'),
        MobileStepper = __webpack_require__('./node_modules/@mui/material/MobileStepper/MobileStepper.js'),
        Typography = __webpack_require__('./node_modules/@mui/material/Typography/Typography.js'),
        lib = __webpack_require__('./node_modules/react-swipeable-views/lib/index.js'),
        lib_default = __webpack_require__.n(lib),
        style = {
          feature: { display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' },
          image: { maxWidth: '320px', maxHeight: '216px', pb: '16px' },
          text: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-around',
            width: '280px',
            height: '144px',
            backgroundColor: 'primary.900',
            borderRadius: '6px',
            p: '16px'
          }
        },
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        CarouselWithImage_CarouselWithImage = function CarouselWithImage(_ref) {
          var items = _ref.items,
            t = Object(useTranslation.a)().t,
            _useState = Object(react.useState)(0),
            _useState2 = Object(slicedToArray.a)(_useState, 2),
            activeStep = _useState2[0],
            setActiveStep = _useState2[1],
            maxSteps = items.length,
            carouselWrapper = items.map(function (item, index) {
              return Object(jsx_runtime.jsxs)(
                Box.a,
                {
                  'data-testid': 'carousel',
                  sx: style.feature,
                  children: [
                    Object(jsx_runtime.jsx)(Box.a, {
                      alt: item.image,
                      component: 'img',
                      src: item.image,
                      sx: style.image
                    }),
                    Object(jsx_runtime.jsxs)(Box.a, {
                      sx: style.text,
                      children: [
                        Object(jsx_runtime.jsx)(Typography.a, {
                          sx: { color: 'basic.white' },
                          variant: 'h6',
                          children: t(item.title)
                        }),
                        Object(jsx_runtime.jsx)(Typography.a, {
                          sx: { color: 'basic.white', fontSize: '14px' },
                          variant: 'subtitle1',
                          children: t(item.description)
                        })
                      ]
                    })
                  ]
                },
                index
              )
            })
          return Object(jsx_runtime.jsxs)(jsx_runtime.Fragment, {
            children: [
              Object(jsx_runtime.jsx)(lib_default.a, {
                enableMouseEvents: !0,
                index: activeStep,
                onChangeIndex: function handleStepChange(step) {
                  setActiveStep(step)
                },
                children: carouselWrapper
              }),
              Object(jsx_runtime.jsx)(MobileStepper.a, {
                activeStep: activeStep,
                position: 'static',
                steps: maxSteps,
                sx: { display: 'flex', justifyContent: 'center', pt: '16px', boxShadow: 'none' },
                variant: 'dots'
              })
            ]
          })
        }
      CarouselWithImage_CarouselWithImage.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'CarouselWithImage'
      }
      var carousel_with_image_CarouselWithImage = CarouselWithImage_CarouselWithImage
      'undefined' != typeof STORYBOOK_REACT_CLASSES &&
        (STORYBOOK_REACT_CLASSES['src/components/carousel-with-image/CarouselWithImage.js'] = {
          name: 'CarouselWithImage',
          docgenInfo: CarouselWithImage_CarouselWithImage.__docgenInfo,
          path: 'src/components/carousel-with-image/CarouselWithImage.js'
        })
      var map = __webpack_require__('./src/assets/img/guest-home-page/map.svg'),
        Default =
          ((__webpack_exports__.default = {
            title: 'CarouselWithImage',
            component: carousel_with_image_CarouselWithImage,
            argTypes: { items: { type: 'array', description: 'Array of CarouselWithImage items to show' } }
          }),
          function Template(args) {
            return Object(jsx_runtime.jsx)(carousel_with_image_CarouselWithImage, Object(objectSpread2.a)({}, args))
          }.bind({}))
      ;(Default.args = {
        items: [
          {
            image: map.a,
            title: 'Flexible Location',
            description:
              'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
          },
          {
            image: map.a,
            title: 'Individual Time',
            description:
              'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
          },
          {
            image: map.a,
            title: 'Free Choice of Teachers',
            description:
              'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
          },
          {
            image: map.a,
            title: 'Digital Communication',
            description:
              'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
          }
        ]
      }),
        (Default.parameters = Object(objectSpread2.a)(
          { storySource: { source: '(args) => <CarouselWithImage {...args} />' } },
          Default.parameters
        ))
    },
    './src/stories/ConfirmDialog.stories.js': function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'Default', function () {
          return Default
        })
      var _Users_viktor_ishchenko_work_SpaceToStudy_Client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js'
          ),
        _components_confirm_dialog_ConfirmDialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './src/components/confirm-dialog/ConfirmDialog.js'
        ),
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__('./node_modules/react/jsx-runtime.js')
      __webpack_exports__.default = {
        title: 'ConfirmDialog',
        component: _components_confirm_dialog_ConfirmDialog__WEBPACK_IMPORTED_MODULE_1__.a,
        argTypes: { onConfirm: { action: 'Confirmed' }, onDismiss: { action: 'Dismissed' } }
      }
      var Default = function Template(args) {
        return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
          _components_confirm_dialog_ConfirmDialog__WEBPACK_IMPORTED_MODULE_1__.a,
          Object(
            _Users_viktor_ishchenko_work_SpaceToStudy_Client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a
          )({}, args)
        )
      }.bind({})
      ;(Default.args = {
        title: 'Title',
        message:
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking.',
        open: !0
      }),
        (Default.parameters = Object(
          _Users_viktor_ishchenko_work_SpaceToStudy_Client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a
        )({ storySource: { source: '(args) => <ConfirmDialog {...args} />' } }, Default.parameters))
    },
    './src/stories/FileUploader.stories.js': function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'Default', function () {
          return FileUploader_stories_Default
        })
      var objectSpread2 = __webpack_require__(
          './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js'
        ),
        react = __webpack_require__('./node_modules/react/index.js'),
        useTranslation = __webpack_require__('./node_modules/react-i18next/dist/es/useTranslation.js'),
        ListItem = __webpack_require__('./node_modules/@mui/material/ListItem/ListItem.js'),
        Typography = __webpack_require__('./node_modules/@mui/material/Typography/Typography.js'),
        IconButton = __webpack_require__('./node_modules/@mui/material/IconButton/IconButton.js'),
        Box = __webpack_require__('./node_modules/@mui/material/Box/Box.js'),
        List = __webpack_require__('./node_modules/@mui/material/List/List.js'),
        Button = __webpack_require__('./node_modules/@mui/material/Button/Button.js'),
        CloudUpload = __webpack_require__('./node_modules/@mui/icons-material/CloudUpload.js'),
        CloudUpload_default = __webpack_require__.n(CloudUpload),
        Close = __webpack_require__('./node_modules/@mui/icons-material/Close.js'),
        Close_default = __webpack_require__.n(Close),
        toConsumableArray = __webpack_require__(
          './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js'
        ),
        slicedToArray = __webpack_require__(
          './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js'
        ),
        filesValidation = function filesValidation(files, validationData) {
          var error
          return (
            files.some(function (file) {
              return file.size > validationData.maxFileSize
            }) && (error = validationData.fileSizeError),
            files.reduce(function (acc, file) {
              return acc + file.size
            }, 0) > validationData.maxAllFilesSize && (error = validationData.allFilesSizeError),
            files.length > 0 &&
              !files.every(function (file) {
                return validationData.filesTypes.some(function (type) {
                  return file.type === type
                })
              }) &&
              (error = validationData.typeError),
            error
          )
        },
        use_upload = function useUpload(_ref) {
          var initialState = _ref.initialState,
            initialError = _ref.initialError,
            validationData = _ref.validationData,
            _useState = Object(react.useState)(initialState),
            _useState2 = Object(slicedToArray.a)(_useState, 2),
            files = _useState2[0],
            setFiles = _useState2[1],
            _useState3 = Object(react.useState)(!1),
            _useState4 = Object(slicedToArray.a)(_useState3, 2),
            isDrag = _useState4[0],
            setIsDrag = _useState4[1],
            _useState5 = Object(react.useState)(initialError),
            _useState6 = Object(slicedToArray.a)(_useState5, 2),
            error = _useState6[0],
            setError = _useState6[1]
          return {
            dragStart: function dragStart(e) {
              e.preventDefault(), setIsDrag(!0)
            },
            dragLeave: function dragLeave(e) {
              e.preventDefault(), setIsDrag(!1)
            },
            dragDrop: function dragDrop(e) {
              e.preventDefault()
              var newFiles = []
                .concat(Object(toConsumableArray.a)(files), Object(toConsumableArray.a)(e.dataTransfer.files))
                .slice(0, validationData.maxQuantityFiles)
              setFiles(newFiles), setIsDrag(!1), setError(filesValidation(newFiles, validationData))
            },
            addFiles: function addFiles(e) {
              e.preventDefault()
              var newFiles = []
                .concat(Object(toConsumableArray.a)(files), Object(toConsumableArray.a)(e.target.files))
                .slice(0, validationData.dataTransfermaxQuantityFiles)
              setFiles(newFiles), setError(filesValidation(newFiles, validationData))
            },
            deleteFile: function deleteFile(file) {
              var newFiles = files.filter(function (item) {
                return item !== file
              })
              setFiles(newFiles), setError(filesValidation(newFiles, validationData))
            },
            files: files,
            isDrag: isDrag,
            error: error
          }
        },
        style = {
          root: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            minHeight: '100px',
            border: 'dashed',
            borderColor: 'primary.200',
            borderRadius: '4px',
            overflow: 'auto'
          },
          rootDrag: { borderColor: 'primary.900', backgroundColor: 'basic.grey' },
          icon: { my: 'auto', mr: 1, color: 'primary.700' },
          listItem: { display: 'flex', justifyContent: 'space-between', p: 0 },
          fileName: { textOverflow: 'ellipsis', overflow: 'hidden', ml: 1 },
          close: { color: 'primary.700', fontSize: '20px' }
        },
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        FileUploader_FileUploader = function FileUploader(_ref) {
          var buttonText = _ref.buttonText,
            emitter = _ref.emitter,
            initialState = _ref.initialState,
            initialError = _ref.initialError,
            validationData = _ref.validationData,
            t = Object(useTranslation.a)().t,
            _useUpload = use_upload({
              initialState: initialState,
              initialError: initialError,
              validationData: validationData
            }),
            dragStart = _useUpload.dragStart,
            dragLeave = _useUpload.dragLeave,
            dragDrop = _useUpload.dragDrop,
            addFiles = _useUpload.addFiles,
            deleteFile = _useUpload.deleteFile,
            files = _useUpload.files,
            isDrag = _useUpload.isDrag,
            error = _useUpload.error
          Object(react.useEffect)(
            function () {
              emitter(files, error)
            },
            [files, error, emitter]
          )
          var filesList = files.map(function (item) {
            return Object(jsx_runtime.jsxs)(
              ListItem.a,
              {
                sx: style.listItem,
                children: [
                  Object(jsx_runtime.jsx)(Typography.a, { sx: style.fileName, variant: 'body2', children: item.name }),
                  Object(jsx_runtime.jsx)(IconButton.a, {
                    onClick: function onClick() {
                      return deleteFile(item)
                    },
                    size: 'small',
                    children: Object(jsx_runtime.jsx)(Close_default.a, { sx: style.close })
                  })
                ]
              },
              item.name + Date.now()
            )
          })
          return Object(jsx_runtime.jsxs)(jsx_runtime.Fragment, {
            children: [
              Object(jsx_runtime.jsxs)(Box.a, {
                'data-testid': 'drop',
                onDragLeave: dragLeave,
                onDragOver: dragStart,
                onDragStart: dragStart,
                onDrop: dragDrop,
                sx: [style.root, isDrag && style.rootDrag],
                children: [
                  files.length > 0 && Object(jsx_runtime.jsx)(List.a, { sx: { width: '100%' }, children: filesList }),
                  Object(jsx_runtime.jsxs)(Button.a, {
                    component: 'label',
                    children: [
                      Object(jsx_runtime.jsx)(CloudUpload_default.a, { sx: style.icon }),
                      buttonText,
                      Object(jsx_runtime.jsx)('input', { hidden: !0, multiple: !0, onChange: addFiles, type: 'file' })
                    ]
                  })
                ]
              }),
              error &&
                Object(jsx_runtime.jsx)(Typography.a, { color: 'error', ml: 1, variant: 'caption', children: t(error) })
            ]
          })
        }
      FileUploader_FileUploader.__docgenInfo = { description: '', methods: [], displayName: 'FileUploader' }
      var file_uploader_FileUploader = FileUploader_FileUploader
      'undefined' != typeof STORYBOOK_REACT_CLASSES &&
        (STORYBOOK_REACT_CLASSES['src/components/file-uploader/FileUploader.js'] = {
          name: 'FileUploader',
          docgenInfo: FileUploader_FileUploader.__docgenInfo,
          path: 'src/components/file-uploader/FileUploader.js'
        })
      __webpack_exports__.default = {
        title: 'FileUploader',
        component: file_uploader_FileUploader,
        argTypes: {
          buttonText: { type: 'string', description: 'Button text' },
          initialState: { type: 'array', description: 'Initial state' },
          initialError: { type: 'string', description: 'Initial error' },
          emitter: { type: 'function', description: 'Emiter function' },
          validationData: { type: 'object', description: 'All validation data' }
        }
      }
      var FileUploader_stories_Default = function Default(args) {
        return Object(jsx_runtime.jsxs)('div', {
          style: { maxWidth: '400px', margin: '0 auto' },
          children: [
            Object(jsx_runtime.jsx)('h1', { children: 'File Uploader' }),
            Object(jsx_runtime.jsx)(file_uploader_FileUploader, Object(objectSpread2.a)({}, args))
          ]
        })
      }
      ;(FileUploader_stories_Default.args = {
        buttonText: 'Upload your files',
        emitter: function emitter() {
          return console.log('emitter called')
        },
        initialState: [],
        initialError: null,
        validationData: {
          maxFileSize: 5e6,
          maxAllFilesSize: 2e7,
          filesTypes: ['application/pdf', 'image/jpeg', 'image/png'],
          fileSizeError: 'File size error',
          allFilesSizeError: 'All files size error',
          typeError: 'Type error',
          maxQuantityFiles: 7
        }
      }),
        (FileUploader_stories_Default.parameters = Object(objectSpread2.a)(
          {
            storySource: {
              source:
                "(args) => {\n  return (\n    <div style={{ maxWidth: '400px', margin: '0 auto' }}>\n      <h1>File Uploader</h1>\n      <FileUploader {...args} />\n    </div>\n  )\n}"
            }
          },
          FileUploader_stories_Default.parameters
        )),
        (FileUploader_stories_Default.__docgenInfo = { description: '', methods: [], displayName: 'Default' }),
        'undefined' != typeof STORYBOOK_REACT_CLASSES &&
          (STORYBOOK_REACT_CLASSES['src/stories/FileUploader.stories.js'] = {
            name: 'Default',
            docgenInfo: FileUploader_stories_Default.__docgenInfo,
            path: 'src/stories/FileUploader.stories.js'
          })
    },
    './src/stories/Header.jsx': function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.d(__webpack_exports__, 'a', function () {
        return Header
      })
      __webpack_require__('./node_modules/react/index.js')
      var _Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__('./src/stories/Button.jsx'),
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ =
          (__webpack_require__('./src/stories/header.css'), __webpack_require__('./node_modules/react/jsx-runtime.js')),
        Header = function Header(_ref) {
          var user = _ref.user,
            onLogin = _ref.onLogin,
            onLogout = _ref.onLogout,
            onCreateAccount = _ref.onCreateAccount
          return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)('header', {
            children: Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)('div', {
              className: 'wrapper',
              children: [
                Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)('div', {
                  children: [
                    Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)('svg', {
                      width: '32',
                      height: '32',
                      viewBox: '0 0 32 32',
                      xmlns: 'http://www.w3.org/2000/svg',
                      children: Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)('g', {
                        fill: 'none',
                        fillRule: 'evenodd',
                        children: [
                          Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)('path', {
                            d: 'M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z',
                            fill: '#FFF'
                          }),
                          Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)('path', {
                            d: 'M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z',
                            fill: '#555AB9'
                          }),
                          Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)('path', {
                            d: 'M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z',
                            fill: '#91BAF8'
                          })
                        ]
                      })
                    }),
                    Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)('h1', { children: 'Acme' })
                  ]
                }),
                Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)('div', {
                  children: user
                    ? Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(
                        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,
                        {
                          children: [
                            Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)('span', {
                              className: 'welcome',
                              children: [
                                'Welcome, ',
                                Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)('b', {
                                  children: user.name
                                }),
                                '!'
                              ]
                            }),
                            Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(
                              _Button__WEBPACK_IMPORTED_MODULE_1__.a,
                              { size: 'small', onClick: onLogout, label: 'Log out' }
                            )
                          ]
                        }
                      )
                    : Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(
                        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,
                        {
                          children: [
                            Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(
                              _Button__WEBPACK_IMPORTED_MODULE_1__.a,
                              { size: 'small', onClick: onLogin, label: 'Log in' }
                            ),
                            Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(
                              _Button__WEBPACK_IMPORTED_MODULE_1__.a,
                              { primary: !0, size: 'small', onClick: onCreateAccount, label: 'Sign up' }
                            )
                          ]
                        }
                      )
                })
              ]
            })
          })
        }
      ;(Header.defaultProps = { user: null }),
        (Header.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'Header',
          props: {
            user: {
              defaultValue: { value: 'null', computed: !1 },
              description: '',
              type: { name: 'shape', value: {} },
              required: !1
            },
            onLogin: { description: '', type: { name: 'func' }, required: !0 },
            onLogout: { description: '', type: { name: 'func' }, required: !0 },
            onCreateAccount: { description: '', type: { name: 'func' }, required: !0 }
          }
        }),
        'undefined' != typeof STORYBOOK_REACT_CLASSES &&
          (STORYBOOK_REACT_CLASSES['src/stories/Header.jsx'] = {
            name: 'Header',
            docgenInfo: Header.__docgenInfo,
            path: 'src/stories/Header.jsx'
          })
    },
    './src/stories/Header.stories.jsx': function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'LoggedIn', function () {
          return LoggedIn
        }),
        __webpack_require__.d(__webpack_exports__, 'LoggedOut', function () {
          return LoggedOut
        })
      var _Users_viktor_ishchenko_work_SpaceToStudy_Client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js'
          ),
        _Header__WEBPACK_IMPORTED_MODULE_2__ =
          (__webpack_require__('./node_modules/react/index.js'), __webpack_require__('./src/stories/Header.jsx')),
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__('./node_modules/react/jsx-runtime.js')
      __webpack_exports__.default = {
        title: 'Example/Header',
        component: _Header__WEBPACK_IMPORTED_MODULE_2__.a,
        parameters: { layout: 'fullscreen' }
      }
      var Template = function Template(args) {
          return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(
            _Header__WEBPACK_IMPORTED_MODULE_2__.a,
            Object(
              _Users_viktor_ishchenko_work_SpaceToStudy_Client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a
            )({}, args)
          )
        },
        LoggedIn = Template.bind({})
      LoggedIn.args = { user: { name: 'Jane Doe' } }
      var LoggedOut = Template.bind({})
      ;(LoggedOut.args = {}),
        (LoggedIn.parameters = Object(
          _Users_viktor_ishchenko_work_SpaceToStudy_Client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a
        )({ storySource: { source: '(args) => <Header {...args} />' } }, LoggedIn.parameters)),
        (LoggedOut.parameters = Object(
          _Users_viktor_ishchenko_work_SpaceToStudy_Client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a
        )({ storySource: { source: '(args) => <Header {...args} />' } }, LoggedOut.parameters))
    },
    './src/stories/InfoCard.stories.js': function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'Default', function () {
          return Default
        })
      var objectSpread2 = __webpack_require__(
          './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js'
        ),
        Box = __webpack_require__('./node_modules/@mui/material/Box/Box.js'),
        Button = __webpack_require__('./node_modules/@mui/material/Button/Button.js'),
        TitleWithDescription = __webpack_require__('./src/components/title-with-description/TitleWithDescription.js'),
        styles = {
          card: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxSizing: 'border-box',
            padding: '24px 24px 32px',
            textAlign: 'center',
            backgroundColor: 'basic.white',
            boxShadow: 'primary',
            borderRadius: '6px'
          },
          cardImg: { marginBottom: '24px' },
          cardTitle: {
            maxWidth: { md: '340px', xs: '240px' },
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          },
          cardDescription: { marginBottom: '24px' }
        },
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        InfoCard_InfoCard = function InfoCard(_ref) {
          var img = _ref.img,
            title = _ref.title,
            description = _ref.description,
            actionLabel = _ref.actionLabel,
            cardWidth = _ref.cardWidth,
            action = _ref.action
          return Object(jsx_runtime.jsxs)(Box.a, {
            sx: Object(objectSpread2.a)(Object(objectSpread2.a)({}, styles.card), {}, { maxWidth: cardWidth }),
            children: [
              Object(jsx_runtime.jsx)(Box.a, { alt: title, component: 'img', src: img, sx: styles.cardImg }),
              Object(jsx_runtime.jsx)(TitleWithDescription.a, {
                description: description,
                descriptionStyles: { typography: { md: 'body1', xs: 'body2' } },
                title: title,
                titleStyles: { typography: { md: 'h4', xs: 'h5' } }
              }),
              Object(jsx_runtime.jsx)(Button.a, { onClick: action, variant: 'contained', children: actionLabel })
            ]
          })
        }
      InfoCard_InfoCard.__docgenInfo = { description: '', methods: [], displayName: 'InfoCard' }
      var info_card_InfoCard = InfoCard_InfoCard
      'undefined' != typeof STORYBOOK_REACT_CLASSES &&
        (STORYBOOK_REACT_CLASSES['src/components/info-card/InfoCard.js'] = {
          name: 'InfoCard',
          docgenInfo: InfoCard_InfoCard.__docgenInfo,
          path: 'src/components/info-card/InfoCard.js'
        })
      var logo = __webpack_require__.p + 'static/media/logo.78fc6355.svg',
        Default =
          ((__webpack_exports__.default = {
            title: 'InfoCard',
            component: info_card_InfoCard,
            argTypes: {
              img: { type: 'string', description: 'Image link' },
              title: { type: 'string', description: 'Title value' },
              description: { type: 'string', description: 'Description value' },
              actionLabel: { type: 'string', description: 'Action label' },
              cardWidth: { type: 'string', description: 'Component width' },
              action: { type: 'function', description: 'Function that is called on button click ' }
            }
          }),
          function Template(args) {
            return Object(jsx_runtime.jsx)(info_card_InfoCard, Object(objectSpread2.a)({}, args))
          }.bind({}))
      ;(Default.args = {
        img: logo,
        title: 'Title',
        description: 'Description',
        actionLabel: 'Action label',
        cardWidth: '600px',
        action: function action() {
          return alert('Action is triggered')
        }
      }),
        (Default.parameters = Object(objectSpread2.a)(
          { storySource: { source: '(args) => <InfoCard {...args} />' } },
          Default.parameters
        ))
    },
    './src/stories/Page.stories.jsx': function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'LoggedOut', function () {
          return LoggedOut
        }),
        __webpack_require__.d(__webpack_exports__, 'LoggedIn', function () {
          return LoggedIn
        })
      var regenerator = __webpack_require__(
          './node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js'
        ),
        regenerator_default = __webpack_require__.n(regenerator),
        asyncToGenerator = __webpack_require__(
          './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js'
        ),
        objectSpread2 = __webpack_require__(
          './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js'
        ),
        react = __webpack_require__('./node_modules/react/index.js'),
        react_default = __webpack_require__.n(react),
        esm = __webpack_require__('./node_modules/@storybook/testing-library/dist/esm/index.js'),
        slicedToArray = __webpack_require__(
          './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js'
        ),
        Header = __webpack_require__('./src/stories/Header.jsx'),
        jsx_runtime =
          (__webpack_require__('./src/stories/page.css'), __webpack_require__('./node_modules/react/jsx-runtime.js')),
        Page_Page = function Page() {
          var _React$useState = react_default.a.useState(),
            _React$useState2 = Object(slicedToArray.a)(_React$useState, 2),
            user = _React$useState2[0],
            setUser = _React$useState2[1]
          return Object(jsx_runtime.jsxs)('article', {
            children: [
              Object(jsx_runtime.jsx)(Header.a, {
                user: user,
                onLogin: function onLogin() {
                  return setUser({ name: 'Jane Doe' })
                },
                onLogout: function onLogout() {
                  return setUser(void 0)
                },
                onCreateAccount: function onCreateAccount() {
                  return setUser({ name: 'Jane Doe' })
                }
              }),
              Object(jsx_runtime.jsxs)('section', {
                children: [
                  Object(jsx_runtime.jsx)('h2', { children: 'Pages in Storybook' }),
                  Object(jsx_runtime.jsxs)('p', {
                    children: [
                      'We recommend building UIs with a',
                      ' ',
                      Object(jsx_runtime.jsx)('a', {
                        href: 'https://componentdriven.org',
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        children: Object(jsx_runtime.jsx)('strong', { children: 'component-driven' })
                      }),
                      ' ',
                      'process starting with atomic components and ending with pages.'
                    ]
                  }),
                  Object(jsx_runtime.jsx)('p', {
                    children:
                      'Render pages with mock data. This makes it easy to build and review page states without needing to navigate to them in your app. Here are some handy patterns for managing page data in Storybook:'
                  }),
                  Object(jsx_runtime.jsxs)('ul', {
                    children: [
                      Object(jsx_runtime.jsx)('li', {
                        children:
                          'Use a higher-level connected component. Storybook helps you compose such data from the "args" of child component stories'
                      }),
                      Object(jsx_runtime.jsx)('li', {
                        children:
                          'Assemble data in the page component from your services. You can mock these services out using Storybook.'
                      })
                    ]
                  }),
                  Object(jsx_runtime.jsxs)('p', {
                    children: [
                      'Get a guided tutorial on component-driven development at',
                      ' ',
                      Object(jsx_runtime.jsx)('a', {
                        href: 'https://storybook.js.org/tutorials/',
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        children: 'Storybook tutorials'
                      }),
                      '. Read more in the',
                      ' ',
                      Object(jsx_runtime.jsx)('a', {
                        href: 'https://storybook.js.org/docs',
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        children: 'docs'
                      }),
                      '.'
                    ]
                  }),
                  Object(jsx_runtime.jsxs)('div', {
                    className: 'tip-wrapper',
                    children: [
                      Object(jsx_runtime.jsx)('span', { className: 'tip', children: 'Tip' }),
                      ' Adjust the width of the canvas with the',
                      ' ',
                      Object(jsx_runtime.jsx)('svg', {
                        width: '10',
                        height: '10',
                        viewBox: '0 0 12 12',
                        xmlns: 'http://www.w3.org/2000/svg',
                        children: Object(jsx_runtime.jsx)('g', {
                          fill: 'none',
                          fillRule: 'evenodd',
                          children: Object(jsx_runtime.jsx)('path', {
                            d: 'M1.5 5.2h4.8c.3 0 .5.2.5.4v5.1c-.1.2-.3.3-.4.3H1.4a.5.5 0 01-.5-.4V5.7c0-.3.2-.5.5-.5zm0-2.1h6.9c.3 0 .5.2.5.4v7a.5.5 0 01-1 0V4H1.5a.5.5 0 010-1zm0-2.1h9c.3 0 .5.2.5.4v9.1a.5.5 0 01-1 0V2H1.5a.5.5 0 010-1zm4.3 5.2H2V10h3.8V6.2z',
                            id: 'a',
                            fill: '#999'
                          })
                        })
                      }),
                      'Viewports addon in the toolbar'
                    ]
                  })
                ]
              })
            ]
          })
        }
      ;(Page_Page.__docgenInfo = { description: '', methods: [], displayName: 'Page' }),
        'undefined' != typeof STORYBOOK_REACT_CLASSES &&
          (STORYBOOK_REACT_CLASSES['src/stories/Page.jsx'] = {
            name: 'Page',
            docgenInfo: Page_Page.__docgenInfo,
            path: 'src/stories/Page.jsx'
          })
      __webpack_exports__.default = {
        title: 'Example/Page',
        component: Page_Page,
        parameters: { layout: 'fullscreen' }
      }
      var Page_stories_Template = function Template(args) {
          return Object(jsx_runtime.jsx)(Page_Page, Object(objectSpread2.a)({}, args))
        },
        LoggedOut = Page_stories_Template.bind({}),
        LoggedIn = Page_stories_Template.bind({})
      ;(LoggedIn.play = (function () {
        var _ref2 = Object(asyncToGenerator.a)(
          regenerator_default.a.mark(function _callee(_ref) {
            var canvasElement, canvas, loginButton
            return regenerator_default.a.wrap(function _callee$(_context) {
              for (;;)
                switch ((_context.prev = _context.next)) {
                  case 0:
                    return (
                      (canvasElement = _ref.canvasElement),
                      (canvas = Object(esm.b)(canvasElement)),
                      (_context.next = 4),
                      canvas.getByRole('button', { name: /Log in/i })
                    )
                  case 4:
                    return (loginButton = _context.sent), (_context.next = 7), esm.a.click(loginButton)
                  case 7:
                  case 'end':
                    return _context.stop()
                }
            }, _callee)
          })
        )
        return function (_x) {
          return _ref2.apply(this, arguments)
        }
      })()),
        (LoggedOut.parameters = Object(objectSpread2.a)(
          { storySource: { source: '(args) => <Page {...args} />' } },
          LoggedOut.parameters
        )),
        (LoggedIn.parameters = Object(objectSpread2.a)(
          { storySource: { source: '(args) => <Page {...args} />' } },
          LoggedIn.parameters
        ))
    },
    './src/stories/PopupDialog.stories.js': function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'Desktop', function () {
          return PopupDialog_stories_Desktop
        })
      var objectSpread2 = __webpack_require__(
          './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js'
        ),
        regenerator = __webpack_require__(
          './node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js'
        ),
        regenerator_default = __webpack_require__.n(regenerator),
        asyncToGenerator = __webpack_require__(
          './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js'
        ),
        react = __webpack_require__('./node_modules/react/index.js'),
        Dialog = __webpack_require__('./node_modules/@mui/material/Dialog/Dialog.js'),
        Box = __webpack_require__('./node_modules/@mui/material/Box/Box.js'),
        IconButton = __webpack_require__('./node_modules/@mui/material/IconButton/IconButton.js'),
        Close = __webpack_require__('./node_modules/@mui/icons-material/Close.js'),
        Close_default = __webpack_require__.n(Close),
        slicedToArray = __webpack_require__(
          './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js'
        ),
        ConfirmDialog = __webpack_require__('./src/components/confirm-dialog/ConfirmDialog.js'),
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        ConfirmationDialogContext = Object(react.createContext)({}),
        confirm_context_ConfirmationDialogProvider = function ConfirmationDialogProvider(_ref) {
          var children = _ref.children,
            _useState = Object(react.useState)(!1),
            _useState2 = Object(slicedToArray.a)(_useState, 2),
            dialogOpen = _useState2[0],
            setDialogOpen = _useState2[1],
            _useState3 = Object(react.useState)({}),
            _useState4 = Object(slicedToArray.a)(_useState3, 2),
            dialogConfig = _useState4[0],
            setDialogConfig = _useState4[1],
            _useState5 = Object(react.useState)(!1),
            _useState6 = Object(slicedToArray.a)(_useState5, 2),
            needConfirmation = _useState6[0],
            setNeedConfirmation = _useState6[1]
          return Object(jsx_runtime.jsxs)(ConfirmationDialogContext.Provider, {
            value: {
              openDialog: function openDialog(_ref2) {
                var sendConfirm = _ref2.sendConfirm,
                  message = _ref2.message,
                  title = _ref2.title
                setDialogOpen(!0), setDialogConfig({ sendConfirm: sendConfirm, message: message, title: title })
              },
              needConfirmation: needConfirmation,
              setNeedConfirmation: setNeedConfirmation
            },
            children: [
              Object(jsx_runtime.jsx)(ConfirmDialog.a, {
                message: dialogConfig.message,
                onConfirm: function onConfirm() {
                  dialogConfig.sendConfirm(!0), setDialogOpen(!1)
                },
                onDismiss: function onDismiss() {
                  dialogConfig.sendConfirm(!1), setDialogOpen(!1)
                },
                open: dialogOpen,
                title: dialogConfig.title
              }),
              children
            ]
          })
        }
      ;(confirm_context_ConfirmationDialogProvider.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'ConfirmationDialogProvider'
      }),
        'undefined' != typeof STORYBOOK_REACT_CLASSES &&
          (STORYBOOK_REACT_CLASSES['src/context/confirm-context.js'] = {
            name: 'ConfirmationDialogProvider',
            docgenInfo: confirm_context_ConfirmationDialogProvider.__docgenInfo,
            path: 'src/context/confirm-context.js'
          })
      var react_router = __webpack_require__('./node_modules/react-router/index.js'),
        use_confirm = function useConfirm() {
          var _useContext = Object(react.useContext)(ConfirmationDialogContext),
            openDialog = _useContext.openDialog,
            needConfirmation = _useContext.needConfirmation,
            setNeedConfirmation = _useContext.setNeedConfirmation,
            navigator = Object(react.useContext)(react_router.b).navigator
          Object(react.useEffect)(
            function () {
              var unblock = navigator.block()
              return (
                needConfirmation || unblock(),
                function () {
                  return unblock()
                }
              )
            },
            [needConfirmation, navigator]
          ),
            Object(react.useEffect)(
              function () {
                return function () {
                  setNeedConfirmation(!1)
                }
              },
              [setNeedConfirmation]
            )
          return {
            checkConfirmation: function checkConfirmation(_ref) {
              var message = _ref.message,
                title = _ref.title
              return (
                !needConfirmation ||
                new Promise(function (res) {
                  openDialog({ sendConfirm: res, message: message, title: title })
                })
              )
            },
            setNeedConfirmation: setNeedConfirmation,
            openDialog: openDialog
          }
        },
        useTheme = __webpack_require__('./node_modules/@mui/material/styles/useTheme.js'),
        useMediaQuery = __webpack_require__('./node_modules/@mui/material/useMediaQuery/useMediaQuery.js'),
        use_breakpoints = function useBreakpoints() {
          var theme = Object(useTheme.a)(),
            sizes_desktop = Object(useMediaQuery.a)(theme.breakpoints.up('md'), { noSsr: !0 }),
            sizes_tablet = Object(useMediaQuery.a)(theme.breakpoints.between('sm', 'md'), { noSsr: !0 })
          Object(useMediaQuery.a)(theme.breakpoints.between('xs', 'sm'), { noSsr: !0 })
          return sizes_desktop ? 'desktop' : sizes_tablet ? 'tablet' : 'mobile'
        },
        style = {
          box: { margin: { xs: '0 auto', sm: 0 }, padding: { xs: 0, sm: 2, md: 4 } },
          icon: {
            color: 'primary.900',
            position: 'absolute',
            right: { xs: '8px', sm: '20px' },
            top: { xs: '8px', sm: '20px' }
          }
        },
        PopupDialog_PopupDialog = function PopupDialog(_ref) {
          var content = _ref.content,
            closeModal = _ref.closeModal,
            isFullScreen = _ref.isFullScreen,
            setFullScreen = _ref.setFullScreen,
            checkConfirmation = use_confirm().checkConfirmation,
            size = use_breakpoints(),
            onClose = (function () {
              var _ref2 = Object(asyncToGenerator.a)(
                regenerator_default.a.mark(function _callee() {
                  return regenerator_default.a.wrap(function _callee$(_context) {
                    for (;;)
                      switch ((_context.prev = _context.next)) {
                        case 0:
                          return (
                            (_context.next = 2),
                            checkConfirmation({ message: 'questions.confirmation', title: 'titles.confirmTitle' })
                          )
                        case 2:
                          _context.sent && closeModal()
                        case 4:
                        case 'end':
                          return _context.stop()
                      }
                  }, _callee)
                })
              )
              return function onClose() {
                return _ref2.apply(this, arguments)
              }
            })()
          return (
            Object(react.useEffect)(
              function () {
                return function () {
                  return setFullScreen(!1)
                }
              },
              [setFullScreen]
            ),
            Object(jsx_runtime.jsx)(Dialog.a, {
              'data-testid': 'popup',
              fullScreen: isFullScreen || 'mobile' === size,
              maxWidth: 'xl',
              onClose: onClose,
              open: !0,
              children: Object(jsx_runtime.jsxs)(Box.a, {
                sx: style.box,
                children: [
                  Object(jsx_runtime.jsx)(IconButton.a, {
                    onClick: onClose,
                    sx: style.icon,
                    children: Object(jsx_runtime.jsx)(Close_default.a, {})
                  }),
                  Object(jsx_runtime.jsx)(Box.a, { children: content })
                ]
              })
            })
          )
        }
      PopupDialog_PopupDialog.__docgenInfo = { description: '', methods: [], displayName: 'PopupDialog' }
      var popup_dialog_PopupDialog = PopupDialog_PopupDialog
      'undefined' != typeof STORYBOOK_REACT_CLASSES &&
        (STORYBOOK_REACT_CLASSES['src/components/popup-dialog/PopupDialog.js'] = {
          name: 'PopupDialog',
          docgenInfo: PopupDialog_PopupDialog.__docgenInfo,
          path: 'src/components/popup-dialog/PopupDialog.js'
        })
      var ModalContext = Object(react.createContext)(),
        modal_context_ModalProvider = function ModalProvider(props) {
          var _useState = Object(react.useState)(),
            _useState2 = Object(slicedToArray.a)(_useState, 2),
            modal = _useState2[0],
            setModal = _useState2[1],
            _useState3 = Object(react.useState)(!1),
            _useState4 = Object(slicedToArray.a)(_useState3, 2),
            isFullScreen = _useState4[0],
            setFullScreen = _useState4[1],
            closeModal = Object(react.useCallback)(
              function () {
                setModal()
              },
              [setModal]
            )
          return Object(jsx_runtime.jsxs)(
            ModalContext.Provider,
            Object(objectSpread2.a)(
              Object(objectSpread2.a)(
                { value: { setModal: setModal, closeModal: closeModal, setFullScreen: setFullScreen } },
                props
              ),
              {},
              {
                children: [
                  props.children,
                  modal &&
                    Object(jsx_runtime.jsx)(popup_dialog_PopupDialog, {
                      closeModal: closeModal,
                      content: modal,
                      isFullScreen: isFullScreen,
                      setFullScreen: setFullScreen
                    })
                ]
              }
            )
          )
        }
      ;(modal_context_ModalProvider.__docgenInfo = { description: '', methods: [], displayName: 'ModalProvider' }),
        'undefined' != typeof STORYBOOK_REACT_CLASSES &&
          (STORYBOOK_REACT_CLASSES['src/context/modal-context.js'] = {
            name: 'ModalProvider',
            docgenInfo: modal_context_ModalProvider.__docgenInfo,
            path: 'src/context/modal-context.js'
          })
      __webpack_exports__.default = {
        title: 'PopupDialog',
        component: popup_dialog_PopupDialog,
        argTypes: { content: { type: 'string', description: 'Content component' } }
      }
      var PopupDialog_stories_Desktop = function Desktop(_ref) {
        var content = _ref.content,
          setModal = Object(react.useContext)(ModalContext).setModal
        return Object(jsx_runtime.jsx)('button', {
          onClick: function openDialog() {
            setModal(Object(jsx_runtime.jsx)('div', { style: { width: '400px', height: '200px' }, children: content }))
          },
          children: 'Open modal'
        })
      }
      ;(PopupDialog_stories_Desktop.decorators = [
        function (Story) {
          return Object(jsx_runtime.jsx)(react_router.a, {
            children: Object(jsx_runtime.jsx)(modal_context_ModalProvider, {
              children: Object(jsx_runtime.jsx)(Story, {})
            })
          })
        }
      ]),
        (PopupDialog_stories_Desktop.args = { content: 'Here you can pass your component' }),
        (PopupDialog_stories_Desktop.parameters = Object(objectSpread2.a)(
          {
            storySource: {
              source:
                "({ content }) => {\n  const { setModal } = useContext(ModalContext)\n\n  const openDialog = () => {\n    setModal(<div style={{ width: '400px', height: '200px' }}>{content}</div>)\n  }\n\n  return <button onClick={openDialog}>Open modal</button>\n}"
            }
          },
          PopupDialog_stories_Desktop.parameters
        )),
        (PopupDialog_stories_Desktop.__docgenInfo = { description: '', methods: [], displayName: 'Desktop' }),
        'undefined' != typeof STORYBOOK_REACT_CLASSES &&
          (STORYBOOK_REACT_CLASSES['src/stories/PopupDialog.stories.js'] = {
            name: 'Desktop',
            docgenInfo: PopupDialog_stories_Desktop.__docgenInfo,
            path: 'src/stories/PopupDialog.stories.js'
          })
    },
    './src/stories/TitleWithDescription.stories.js': function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'Desktop', function () {
          return Desktop
        }),
        __webpack_require__.d(__webpack_exports__, 'Tablet', function () {
          return Tablet
        }),
        __webpack_require__.d(__webpack_exports__, 'Mobile', function () {
          return Mobile
        })
      var _Users_viktor_ishchenko_work_SpaceToStudy_Client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js'
          ),
        _components_title_with_description_TitleWithDescription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './src/components/title-with-description/TitleWithDescription.js'
        ),
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__('./node_modules/react/jsx-runtime.js')
      __webpack_exports__.default = {
        title: 'TitleWithDescription',
        component: _components_title_with_description_TitleWithDescription__WEBPACK_IMPORTED_MODULE_1__.a,
        argTypes: {
          title: { type: 'string', description: 'Title value' },
          description: { type: 'string', description: 'Description value' },
          titleStyles: { type: 'object', description: 'Title styles' },
          descriptionStyles: { type: 'object', description: 'Description styles' }
        }
      }
      var Template = function Template(args) {
          return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
            _components_title_with_description_TitleWithDescription__WEBPACK_IMPORTED_MODULE_1__.a,
            Object(
              _Users_viktor_ishchenko_work_SpaceToStudy_Client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a
            )({}, args)
          )
        },
        Desktop = Template.bind({})
      Desktop.args = {
        title: 'Title',
        description: 'Description',
        titleStyles: { typography: 'h2' },
        descriptionStyles: { typography: 'subtitle1' }
      }
      var Tablet = Template.bind({})
      Tablet.args = {
        title: 'Title',
        description: 'Description',
        titleStyles: { typography: 'h3' },
        descriptionStyles: { typography: 'subtitle1' }
      }
      var Mobile = Template.bind({})
      ;(Mobile.args = {
        title: 'Title',
        description: 'Description',
        titleStyles: { typography: 'h4' },
        descriptionStyles: { typography: 'subtitle2' }
      }),
        (Desktop.parameters = Object(
          _Users_viktor_ishchenko_work_SpaceToStudy_Client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a
        )({ storySource: { source: '(args) => <TitleWithDescription {...args} />' } }, Desktop.parameters)),
        (Tablet.parameters = Object(
          _Users_viktor_ishchenko_work_SpaceToStudy_Client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a
        )({ storySource: { source: '(args) => <TitleWithDescription {...args} />' } }, Tablet.parameters)),
        (Mobile.parameters = Object(
          _Users_viktor_ishchenko_work_SpaceToStudy_Client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a
        )({ storySource: { source: '(args) => <TitleWithDescription {...args} />' } }, Mobile.parameters))
    },
    './src/stories/VideoBox.stories.js': function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'Default', function () {
          return Default
        })
      var objectSpread2 = __webpack_require__(
          './node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js'
        ),
        Box = __webpack_require__('./node_modules/@mui/material/Box/Box.js'),
        styles = {
          titleBar: { maxWidth: '100%', mb: '-4px' },
          videoBg: {
            padding: { md: '32px 60px', sm: '20px 40px', xs: '20px 12px' },
            backgroundColor: 'basic.grey',
            borderRadius: { md: '0 0 20px 20px', sm: '0 0 12px 12px', xs: '0 0 8px 8px' }
          },
          video: { display: 'block', maxWidth: '100%', margin: '0 auto' }
        },
        jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
        VideoBox_VideoBox = function VideoBox(_ref) {
          var video = _ref.video
          return Object(jsx_runtime.jsxs)(Box.a, {
            children: [
              Object(jsx_runtime.jsx)(Box.a, {
                alt: 'Title bar',
                component: 'img',
                src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABGgAAAAtCAYAAADyUF38AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAa4SURBVHgB7d3bj5xlHcDx553Dzmy7JyrVYStl1qy0ROSgEdYE6QCiXBhJuAG9EO/0wvg3+G94Z280ajTBeGGCmLYhUMBCSwM9YTsEXZYutNM9dGd2Dq99F0q09LD77rbvsv187jrzvH3mdr95nt8bhZRePnKkGsWFSl/oVeOQq8RRKEchlAMAAADATSAOoZmL4kboxY1ulJvqhE7923fdVQ8pRCtZfOrUqfKHzc7EhYcmxBgAAACAS8ShEed79fz583vuv//+xnIfW1agScLMmVa3FuJ4IgAAAABwTXGud3C5oeaagebA2ycm4ijUnJgBAAAAWKE4NLq9eM8Dd9958GrLrhpoDhx95wmnZgAAAABWpxtF+x/YOf63K31/2UCzdKWp2X7mwtfVAAAAAMCqRVE8dUup+JuxsbHmpd/lLvfA2Vbvp+IMAAAAwNqJ46jy8YGYz/pMoEmuNcVxrxIAAAAAWGNR9dVkpMwl/i/QvHr8+H1mzgAAAABcP/kL7SV5KdP/fvZpoHnjjVMj+U6+FgAAAAC4rqIo1JIZwBf//Wmg6Za6tRD1RgIAAAAA11UcQnm6daHFfGIp0CSnZ6Iovi8AAAAAcEMkV50unqJZCjRLp2cAAAAAuKE+bHaWZtEsBZooRNUAAAAAwA2VD+HjQPPGkSNVs2cAAAAAbrxkFs3LF9pMoRMK1VxYPwbfevOOTSdO7CxPvb8z12wuhaPOwMBUZ2hk6sxDD+9tjY42whrr70yO3Lrw0oP9nfd35uNP9swNTLXzw1ONvrsPNkr3vBuug5ncfHnf5n8+eLrwUXUuN1/pRN1yIc43t3SH69vb244+PP/NQwEAAADY0PriQiV6/e13nomjeGfIWH7mXHnrP/6+q79+auJq6xaqX9k//dhje7uDw82wBm6f/dP3B9onr75ncdvBD/prexcKaxeHnh94aeJI6V+7kihzpTXluK/x1MzjuyvtrWsepQAAAID1IYqjo9HrR4//PI6jSshQEmdG//C7Zwtzc8v6HcmJmsmnf7R7tZGmOvvbJ/vb/1nW26u6Ublxaugnv27nVx+G/jq4p3a8VN+1nLUiDQAAAGxwUWjkenGU+fyZ5OTMcuNMIlm79YUXlhU4rmR09i+15caZRHL1afvcH58Oq7Rv84F7lxtnEs1oceTPQ88/m1yHCgAAAMCGE8WhnItCyPQP/9Lk5Mi1rjVdTn/95MTgm4erIYVk5sxw+9iKA09f92z1luahaliFw+XjtbBCSaTZt/m1BwMAAACw4SSDgjOfD7zlxX2pT8JsOnl8R0hhuHU49cydLa3XUv/eV/sP72hFrVQnlk72vbfiiAUAAAB8PmQeaIqz51LPv0ne9BRS2Nx+L1XYSRS7M6l/77+LU9WQUjJMeKo47XXoAAAAsAFlHmjys7Opg8fF13CveM94IXXoiEK3nFyRCimczy2sKrCczp8RaAAAAGADyjzQ3EyKcWFNXg0OAAAAbCyZB5peuZz69dHdgcGpkEI36k+9ZxzyzYXCaKrni3FxVYFmU2+TwAMAAAAbUOaBplW57WhIqT2ULtAs5L/4bkipnR9KtWdifHH7sZBSOe5rjC/ennpvAAAAYP3KPNDMj4+njhZnHqrtDSlMDzyyP47SXTeaLYwfCind09xRL8WlVKdvti+OHgwAAADAhpR5oJm9+976wtjY/rBCC9Wx/a3RdFeN2tFg81zhrhXHnYXCtoOnN9dWFUq+M/+N58IKJadnHp7/1isBAAAA2JDWxZDg6Ue/t3cl82Q6AwNT049+N9XpmYveH3xi/0Jx27JjSzcqNz7YVFvVnonkFM2drTuW/f8kceapmcd3D/U2mz8DAAAAG1T+Z7/4ZS1kLC6VOnNf3fFWX+NModhofPlqa5OTMx/84MnnukPDqw4WjdLXj5U6H0Wl3kfVq61bzN9Sf3fwx7tbha1zYQ3cuThWn8vNtc7l52/tRt3yldaNdIfqP5x95PeV9tbUQ40BAACA9S86cOTEr8I6UpqcHNny4r5dxZlGJT83V0k+S9701KzcdvT8+Pix5EpUWGP9ncmRL53fs6vYm6kUerNLeyYnZhbzX6if6/vaobPltd8zMVWcHjlcOrbzveLpHY38TDX5rBDnm1u6w/V7mjteSU7bBAAAAGDDW3eBBgAAAOBmsy5m0AAAAADczAQaAAAAgIwJNAAAAAAZE2gAAAAAMibQAAAAAGRMoAEAAADImEADAAAAkDGBBgAAACBjAg0AAABAxgQaAAAAgIwJNAAAAAAZE2gAAAAAMibQAAAAAGTsvzkVLagpU/dYAAAAAElFTkSuQmCC',
                sx: styles.titleBar
              }),
              Object(jsx_runtime.jsx)(Box.a, {
                sx: styles.videoBg,
                children: Object(jsx_runtime.jsx)(Box.a, {
                  alt: 'Video',
                  component: 'img',
                  src: video,
                  sx: styles.video
                })
              })
            ]
          })
        }
      VideoBox_VideoBox.__docgenInfo = { description: '', methods: [], displayName: 'VideoBox' }
      var video_box_VideoBox = VideoBox_VideoBox
      'undefined' != typeof STORYBOOK_REACT_CLASSES &&
        (STORYBOOK_REACT_CLASSES['src/components/video-box/VideoBox.js'] = {
          name: 'VideoBox',
          docgenInfo: VideoBox_VideoBox.__docgenInfo,
          path: 'src/components/video-box/VideoBox.js'
        })
      var videoImg = __webpack_require__.p + 'static/media/videoImg.54b775eb.png',
        Default =
          ((__webpack_exports__.default = {
            title: 'VideoBox',
            component: video_box_VideoBox,
            argTypes: { video: { type: 'string', description: 'Variable of the image' } }
          }),
          function Template(args) {
            return Object(jsx_runtime.jsx)(video_box_VideoBox, Object(objectSpread2.a)({}, args))
          }.bind({}))
      ;(Default.args = { video: videoImg }),
        (Default.parameters = Object(objectSpread2.a)(
          { storySource: { source: '(args) => <VideoBox {...args} />' } },
          Default.parameters
        ))
    },
    './src/stories/button.css': function (module, exports, __webpack_require__) {},
    './src/stories/header.css': function (module, exports, __webpack_require__) {},
    './src/stories/page.css': function (module, exports, __webpack_require__) {},
    './src/styles/index.css': function (module, exports, __webpack_require__) {},
    './storybook-init-framework-entry.js': function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__)
      __webpack_require__('./node_modules/@storybook/react/dist/esm/client/index.js')
    },
    0: function (module, exports, __webpack_require__) {
      __webpack_require__('./node_modules/@storybook/core-client/dist/esm/globals/polyfills.js'),
        __webpack_require__('./node_modules/@storybook/core-client/dist/esm/globals/globals.js'),
        __webpack_require__('./storybook-init-framework-entry.js'),
        __webpack_require__('./node_modules/@storybook/react/dist/esm/client/docs/config-generated-config-entry.js'),
        __webpack_require__('./node_modules/@storybook/react/dist/esm/client/preview/config-generated-config-entry.js'),
        __webpack_require__('./node_modules/@storybook/addon-links/preview.js-generated-config-entry.js'),
        __webpack_require__('./node_modules/@storybook/addon-docs/preview.js-generated-config-entry.js'),
        __webpack_require__('./node_modules/@storybook/addon-actions/preview.js-generated-config-entry.js'),
        __webpack_require__('./node_modules/@storybook/addon-backgrounds/preview.js-generated-config-entry.js'),
        __webpack_require__('./node_modules/@storybook/addon-measure/preview.js-generated-config-entry.js'),
        __webpack_require__('./node_modules/@storybook/addon-outline/preview.js-generated-config-entry.js'),
        __webpack_require__('./node_modules/@storybook/addon-interactions/preview.js-generated-config-entry.js'),
        __webpack_require__('./.storybook/preview.js-generated-config-entry.js'),
        (module.exports = __webpack_require__('./generated-stories-entry.js'))
    },
    1: function (module, exports) {}
  },
  [[0, 5, 6]]
])
