export const metaDataGeneratorForNormalPage = (
  title: string = `Home`,
  description: string = `Arfatur Rahman is exploring Mistral AI and integrating it with Next.js to create cutting-edge web applications. Discover innovative solutions and deep dive into AI-driven development.`
) => {
  return {
    title: `${title} || Mistral AI || Arfatur Rahman`,
    description,
    image: `/image/me.webp`,
    openGraph: {
      images: [`/image/me.webp`],
    },
  };
};
