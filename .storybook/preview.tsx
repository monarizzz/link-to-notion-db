import type { Preview } from '@storybook/nextjs-vite'
import { DM_Mono } from 'next/font/google'
import { spyOn } from 'storybook/test'
import '../src/app/globals.css'

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
})

export const decorators: Preview['decorators'] = [
  (Story) => (
    <div className={dmMono.variable}>
      <Story />
    </div>
  ),
]

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export const beforeEach = () => {
  spyOn(console, 'log').mockName('console.log');
};

export default preview;