import { ImageResponse } from '@vercel/og';
import { C, OG_SIZE } from '~/lib/og/config';
import { getOgFontList } from '~/lib/og/fonts';

export default defineEventHandler(async () => {
  const fonts = await getOgFontList();

  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          width: '1200px',
          height: '630px',
          background: C.bg,
          fontFamily: 'Inter',
          position: 'relative',
          overflow: 'hidden',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: -180,
                left: -180,
                width: 620,
                height: 620,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(136,57,239,0.32) 0%, transparent 65%)',
              },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: -160,
                right: -160,
                width: 520,
                height: 520,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(136,57,239,0.18) 0%, transparent 65%)',
              },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                gap: 22,
                padding: '0 120px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      fontSize: 82,
                      fontWeight: 600,
                      lineHeight: 1,
                      letterSpacing: '-3px',
                    },
                    children: [
                      { type: 'span', props: { style: { color: C.text }, children: 'pronouns' } },
                      { type: 'span', props: { style: { color: C.accent }, children: '.blue' } },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 27,
                      color: C.muted,
                      textAlign: 'center',
                      lineHeight: 1.45,
                    },
                    children: 'Share your names and pronouns on the Bluesky network',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    { ...OG_SIZE, fonts },
  );
});
