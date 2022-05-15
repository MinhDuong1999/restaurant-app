module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width : {
        150 :'150px',
        190:'190px' ,
        225: '225px',
        275 :'275px',
        300: '300px' ,
        340: '340px',
        350 :'350px',
        375: '375px' ,
        460: '460px',
        656 :'656px',
        880: '880px' ,
        508: '508px',
      },
      height: {
        80  :'80px',
        150:'150px' ,
        225: '225px',
        300: '300px' ,
        340: '340px',
        370 :'370px',
        420: '420px' ,
        510: '510px',
        600: '600px',
        650: '650px',
        685: '685px',
        800: '800px' ,
        "90vh": '90vh'
      } ,
      minWidth: {
        210: '210px',
        350: '350px',
        620: '620px'
      } ,
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ...}
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      colors : {
        headingColor: '#2e2e2e',
        textColor: '#515151',
        cartNumBg: ' rgba(239,48,56,1)',
        primary: '#f5f3f3',
        cardOverlay: 'rgba(256,256,256, 0.4)',
        lightTextGray: '#9ca0ab',
        rowBg: 'rgba(255,218,185,0.3)',
        card: 'rgba(256,256,256,0.6)' ,
        cartBg :'#282a2c' ,
        cartItem : '#2e3033' ,
        cartTotal :'#343739'

      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
