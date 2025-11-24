import dynamic from 'next/dynamic';

export const SkillPyramid = dynamic(
    () => import('../skillPyramidHTML'),
    { ssr: false }
);
