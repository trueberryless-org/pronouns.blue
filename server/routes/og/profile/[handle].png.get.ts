import { ImageResponse } from '@vercel/og';
import { C, OG_SIZE } from '~/lib/og/config';
import { getOgFontList } from '~/lib/og/fonts';
import { getActorProfile } from '~/lib/atproto/profiles';

export default defineEventHandler(async (event) => {
  const handle = decodeURIComponent(getRouterParam(event, 'handle') ?? '').replace(/^@/, '');

  const [fonts, actor] = await Promise.all([getOgFontList(), getActorProfile(handle)]);

  const displayName = actor?.displayName ?? handle;
  const avatarSrc = actor?.avatar ?? null;

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
          alignItems: 'center',
          justifyContent: 'center',
          gap: 48,
          padding: '0 80px',
        },
        children: [
          avatarSrc
            ? {
                type: 'img',
                props: {
                  src: avatarSrc,
                  width: 160,
                  height: 160,
                  style: { borderRadius: '50%', border: `2px solid ${C.border}` },
                },
              }
            : {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    width: 160,
                    height: 160,
                    borderRadius: '50%',
                    background: C.surface,
                    border: `2px solid ${C.border}`,
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 64,
                    fontWeight: 600,
                    color: C.text,
                  },
                  children: displayName.charAt(0).toUpperCase(),
                },
              },
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column', gap: 12 },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 56,
                      fontWeight: 600,
                      color: C.text,
                      lineHeight: 1.1,
                    },
                    children: displayName,
                  },
                },
                {
                  type: 'div',
                  props: { style: { fontSize: 28, color: C.muted }, children: `@${handle}` },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      marginTop: 8,
                      fontSize: 22,
                      color: C.accent,
                      background: C.accentFill,
                      border: `1px solid ${C.accentRing}`,
                      borderRadius: 999,
                      padding: '6px 18px',
                      display: 'flex',
                    },
                    children: 'pronouns.blue',
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
