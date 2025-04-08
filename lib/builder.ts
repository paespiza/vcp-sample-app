import { builder, Builder } from '@builder.io/sdk';

// Initialize Builder with your public API key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// Register basic components
Builder.register('insertMenu', {
  name: 'Basic Components',
  items: [
    { name: 'Text', item: 'Text' },
    { name: 'Image', item: 'Image' },
    { name: 'Columns', item: 'Columns' },
    { name: 'Button', item: 'Button' }
  ]
});

// Register the blog-post model
Builder.register('model', {
  name: 'blog-post',
  hideFromUI: false,
  defaults: {
    title: 'New Blog Post'
  },
  settings: {
    showTargeting: true,
    showPublishing: true,
    previewUrl: 'http://localhost:3000/{{urlPath}}'
  },
  // Add component settings to match the page model
  componentsAllowed: [
    { name: 'Text' },
    { name: 'Image' },
    { name: 'Columns' },
    { name: 'Button' },
    { name: 'Counter' },
    { name: 'TextHero' },
    { name: 'ImageHero' },
    { name: 'SplitHero' },
    { name: 'HeroWithChildren' },
    { name: 'IconCard' },
    { name: 'Footer' },
    { name: 'Header' }
  ],
  useDefaultStyles: true,
  defaultStyles: {
    maxWidth: '1200px',
    margin: 'auto',
    padding: '20px'
  }
});

export const BLOG_POST_MODEL = 'blog-post'; 