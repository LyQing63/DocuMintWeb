import React, {useState} from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { styled, keyframes } from '@stitches/react';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { violet, mauve, indigo, purple, blackA } from '@radix-ui/colors';
import ImageUpload from '@/components/image-upload';
import SearchBar from './searchbar'; // Adjust the import path as necessary

const NavigationMenuDemo = () => {
  const [openOCR, setOpenOCR] = useState(false);


  return (
      <NavigationMenuRoot className="question mr-0">
        <ImageUpload openOCR={openOCR} setOpenOCR={setOpenOCR} />
        <NavigationMenuList>
          <NavigationMenu.Item>
            <NavigationMenuTrigger>
              学习 <CaretDown aria-hidden />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <List>
                <li style={{ gridRow: 'span 3' }}>
                  <NavigationMenu.Link asChild>
                    <Callout href="/">
                      <svg aria-hidden width="38" height="38" viewBox="0 0 25 25" fill="white">
                        <path d="M12.5 17.5L12.5 7.5L16.5 7.5L16.5 17.5H12.5Z"></path>
                        <path d="M8.5 17.5L8.5 7.5L4.5 7.5L4.5 17.5H8.5Z"></path>
                      </svg>
                      <CalloutHeading>Docmint Studio</CalloutHeading>
                      <CalloutText>Perfect, beautiful, convenient, fast. We strive to be your own text editing tool.</CalloutText>
                    </Callout>
                  </NavigationMenu.Link>
                </li>

                <ListItem href="https://capable-foe-900.notion.site/Docmint-18c12adb56794552a4e2555ba0113d2e?pvs=4" title="开始">
                  学习如何在Docmint上快速开始你的文字工作。
                </ListItem>
                <ListItem href="/colors" title="定制">
                  使用我们高度开放的UI设计来定制你的Docmint主题。
                </ListItem>
                <ListItem href="https://docmint.wegic.app/" title="社区">
                  加入我们的社区，看看别人的灵感，分享你的想法和经验。
                </ListItem>
              </List>
            </NavigationMenuContent>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenuTrigger>
              工具 <CaretDown aria-hidden />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <List layout="two">
                <ListItem title="OCR图片识别">
                  <button className="text-left" onClick={() => setOpenOCR(true)}>使用百度AI服务来帮助你获取图片上的文字信息。</button>
                </ListItem>
                <ListItem title="表格识别" href="/primitives/docs/overview/getting-started">
                  将图片上的表格信息快速转换为可编辑的表格。
                </ListItem>
                <ListItem title="与你的文件对话" href="/primitives/docs/guides/styling">
                  使用Docmint的AI功能，根据文件能够回答你的问题。
                </ListItem>
                <ListItem title="询问你的伙伴" href="/primitives/docs/guides/animation">
                  将文字编辑中的问题即时反映给你的搭档，并获取他们的反馈。
                </ListItem>
                <ListItem title="辅助功能" href="/primitives/docs/overview/accessibility">
                  在多种浏览器和辅助技术中进行测试。
                </ListItem>
                <ListItem title="发布版本" href="/primitives/docs/overview/releases">
                  DocMint Studio 的发布版本及其变更日志。
                </ListItem>
              </List>
            </NavigationMenuContent>
          </NavigationMenu.Item>

          <NavigationMenuIndicator>
            <Arrow />
          </NavigationMenuIndicator>
        </NavigationMenuList>

        <ViewportPosition>
          <NavigationMenuViewport />
        </ViewportPosition>

        <SearchBar/>
      </NavigationMenuRoot>
  );
};

const enterFromRight = keyframes({
  from: { transform: 'translateX(200px)', opacity: 0 },
  to: { transform: 'translateX(0)', opacity: 1 },
});

const enterFromLeft = keyframes({
  from: { transform: 'translateX(-200px)', opacity: 0 },
  to: { transform: 'translateX(0)', opacity: 1 },
});

const exitToRight = keyframes({
  from: { transform: 'translateX(0)', opacity: 1 },
  to: { transform: 'translateX(200px)', opacity: 0 },
});

const exitToLeft = keyframes({
  from: { transform: 'translateX(0)', opacity: 1 },
  to: { transform: 'translateX(-200px)', opacity: 0 },
});

const scaleIn = keyframes({
  from: { transform: 'rotateX(30deg) scale(0.9)', opacity: 0 },
  to: { transform: 'rotateX(0deg) scale(1)', opacity: 1 },
});

const scaleOut = keyframes({
  from: { transform: 'rotateX(0deg) scale(1)', opacity: 1 },
  to: { transform: 'rotateX(10deg) scale(0.95)', opacity: 0 },
});

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const NavigationMenuRoot = styled(NavigationMenu.Root, {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  width: '100vw',
  zIndex: 1,
  padding: '0 5px',
});

const NavigationMenuList = styled(NavigationMenu.List, {
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: 'white',
  padding: 4,
  borderRadius: 6,
  listStyle: 'none',
  boxShadow: `0 2px 10px ${blackA.blackA4}`,
  margin: 0,
  width: '100%',
});

const itemStyles = {
  padding: '8px 12px',
  outline: 'none',
  userSelect: 'none',
  fontWeight: 500,
  lineHeight: 1,
  borderRadius: 4,
  fontSize: 15,
  color: violet.violet11,
  '&:focus': { boxShadow: `0 0 0 2px ${violet.violet7}` },
  '&:hover': { backgroundColor: violet.violet3 },
};

const NavigationMenuTrigger = styled(NavigationMenu.Trigger, {
  all: 'unset',
  ...itemStyles,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 2,
});

const NavigationMenuLink = styled(NavigationMenu.Link, {
  ...itemStyles,
  display: 'block',
  textDecoration: 'none',
  fontSize: 15,
  lineHeight: 1,
});

const NavigationMenuContent = styled(NavigationMenu.Content, {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  '@media only screen and (min-width: 600px)': { width: 'auto' },
  animationDuration: '250ms',
  animationTimingFunction: 'ease',
  '&[data-motion="from-start"]': { animationName: enterFromLeft },
  '&[data-motion="from-end"]': { animationName: enterFromRight },
  '&[data-motion="to-start"]': { animationName: exitToLeft },
  '&[data-motion="to-end"]': { animationName: exitToRight },
});

const NavigationMenuIndicator = styled(NavigationMenu.Indicator, {
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  height: 10,
  bottom: '100%',
  overflow: 'hidden',
  zIndex: 1,
  transition: 'width, transform 250ms ease',
  '&[data-state="visible"]': { animation: `${fadeIn} 200ms ease` },
  '&[data-state="hidden"]': { animation: `${fadeOut} 200ms ease` },
});

const NavigationMenuViewport = styled(NavigationMenu.Viewport, {
  position: 'relative',
  transformOrigin: 'bottom center',
  marginBottom: 10,
  width: '100%',
  backgroundColor: 'white',
  borderRadius: 6,
  overflow: 'hidden',
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  height: 'var(--radix-navigation-menu-viewport-height)',
  transition: 'width, height, 300ms ease',
  '&[data-state="open"]': { animation: `${scaleIn} 200ms ease` },
  '&[data-state="closed"]': { animation: `${scaleOut} 200ms ease` },
  '@media only screen and (min-width: 600px)': {
    width: 'var(--radix-navigation-menu-viewport-width)',
  },
});

const List = styled('ul', {
  display: 'grid',
  padding: 22,
  margin: 0,
  columnGap: 10,
  listStyle: 'none',
  variants: {
    layout: {
      one: {
        '@media only screen and (min-width: 600px)': {
          width: 500,
          gridTemplateColumns: '.75fr 1fr',
        },
      },
      two: {
        '@media only screen and (min-width: 600px)': {
          width: 600,
          gridAutoFlow: 'column',
          gridTemplateRows: 'repeat(3, 1fr)',
        },
      },
    },
  },
  defaultVariants: {
    layout: 'one',
  },
});

const ListItem = React.forwardRef(({ children, title, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <ListItemLink {...props} ref={forwardedRef}>
          <ListItemHeading>{title}</ListItemHeading>
          <ListItemText>{children}</ListItemText>
        </ListItemLink>
      </NavigationMenu.Link>
    </li>
));

const ListItemLink = styled('a', {
  display: 'block',
  outline: 'none',
  textDecoration: 'none',
  userSelect: 'none',
  padding: 12,
  borderRadius: 6,
  fontSize: 15,
  lineHeight: 1,
  '&:focus': { boxShadow: `0 0 0 2px ${violet.violet7}` },
  '&:hover': { backgroundColor: mauve.mauve3 },
});

const ListItemHeading = styled('div', {
  fontWeight: 500,
  lineHeight: 1.2,
  marginBottom: 5,
  color: violet.violet12,
});

const ListItemText = styled('p', {
  all: 'unset',
  color: mauve.mauve11,
  lineHeight: 1.4,
  fontWeight: 'initial',
});

const Callout = styled('a', {
  display: 'flex',
  justifyContent: 'flex-end',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  background: `linear-gradient(135deg, ${purple.purple9} 0%, ${indigo.indigo9} 100%);`,
  borderRadius: 6,
  padding: 25,
  textDecoration: 'none',
  outline: 'none',
  userSelect: 'none',
  '&:focus': { boxShadow: `0 0 0 2px ${violet.violet7}` },
});

const CalloutHeading = styled('div', {
  color: 'white',
  fontSize: 18,
  fontWeight: 500,
  lineHeight: 1.2,
  marginTop: 16,
  marginBottom: 7,
});

const CalloutText = styled('p', {
  all: 'unset',
  color: mauve.mauve4,
  fontSize: 14,
  lineHeight: 1.3,
});

const ViewportPosition = styled('div', {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  bottom: '100%',
  left: 0,
  perspective: '2000px',
});

const CaretDown = styled(CaretDownIcon, {
  position: 'relative',
  color: violet.violet10,
  top: 1,
  transition: 'transform 250ms ease',
  '[data-state=open] &': { transform: 'rotate(180deg)' },
});

const Arrow = styled('div', {
  position: 'relative',
  bottom: '70%',
  backgroundColor: 'white',
  width: 10,
  height: 10,
  transform: 'rotate(45deg)',
  borderTopLeftRadius: 2,
});

export default NavigationMenuDemo;
