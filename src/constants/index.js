import {
  contact,
  css,
  express,
  git,
  github,
  html,
  javascript,
  linkedin,
  mongodb,
  nodejs,
  react,
  redux,
  sass,
  tailwindcss,
  python,
  swift,
  android,
  xcode,
  vite,
  unity,
  cSharp,
  aws,
  ejs,
  java,
  mysql,
  csu,
  mbs,
  pc,
} from '../assets/icons';

export const skills = [
  {
    imageUrl: aws,
    name: 'AmazonAWS',
    type: 'Cloud',
  },
  {
    imageUrl: java,
    name: 'Java',
    type: 'OOP',
  },
  {
    imageUrl: python,
    name: 'Python',
    type: 'Backend',
  },
  {
    imageUrl: cSharp,
    name: 'C-Sharp',
    type: 'OOP',
  },
  {
    imageUrl: html,
    name: 'HTML',
    type: 'Frontend',
  },
  {
    imageUrl: css,
    name: 'CSS',
    type: 'Frontend',
  },
  {
    imageUrl: sass,
    name: 'Sass',
    type: 'Frontend',
  },
  {
    imageUrl: tailwindcss,
    name: 'Tailwind CSS',
    type: 'Frontend',
  },
  {
    imageUrl: nodejs,
    name: 'Node.js',
    type: 'Backend',
  },
  {
    imageUrl: javascript,
    name: 'JavaScript',
    type: 'Frontend',
  },
  {
    imageUrl: react,
    name: 'React',
    type: 'Frontend',
  },
  {
    imageUrl: vite,
    name: 'Vite',
    type: 'Frontend',
  },
  {
    imageUrl: redux,
    name: 'Redux',
    type: 'State Management',
  },
  {
    imageUrl: express,
    name: 'Express',
    type: 'Backend',
  },
  {
    imageUrl: ejs,
    name: 'ejs',
    type: 'JavascriptTemplate',
  },
  {
    imageUrl: mongodb,
    name: 'MongoDB',
    type: 'Database',
  },
  {
    imageUrl: mysql,
    name: 'MySQL',
    type: 'Database',
  },

  {
    imageUrl: git,
    name: 'Git',
    type: 'Version Control',
  },
  {
    imageUrl: github,
    name: 'GitHub',
    type: 'Version Control',
  },
  {
    imageUrl: xcode,
    name: 'Xcode',
    type: 'IDE',
  },
  {
    imageUrl: swift,
    name: 'Swift',
    type: 'iOS',
  },
  {
    imageUrl: android,
    name: 'AndroStudio',
    type: 'Android',
  },
  {
    imageUrl: unity,
    name: 'Unity',
    type: 'GameDev',
  },
];

export const experiences = [
  {
    title: 'Computer Science',
    company_name: 'California State University Dominguez Hills',
    icon: csu,
    iconBg: '#b33939',
    points: [
      'CSUDH provided me with a strong foundation in both theoretical and practical aspects of computing.',

      'Proficient in Java and Python, with a strong emphasis on using these languages for data structures and data analysis, enhancing the ability to tackle complex software challenges.',

      'An elective in computer graphics merged programming with essential math, like calculus and linear algebra, focusing on graphics programming and devices. This sparked my interest in 3D modeling and animation.',

      'Participated in CSUDH hackathon known as Torohack, which further honed my skills in real-world programming and collaborative development under tight deadlines.',
    ],
  },
  {
    title: 'Cloud Engineering',
    company_name: 'Amazon AWS Cloud Institute',
    icon: aws,
    iconBg: '#d2dae2',
    points: [
      'Enrolled in a year-long virtual cloud-skills training program at the AWS Cloud Institute, designed to rapidly develop essential cloud computing skills.',

      'Preparing for industry-recognized certifications, including AWS Certified Cloud Practitioner and AWS Certified Developer - Associate.',

      'Gaining hands-on experience through practical projects and operations training in cloud management and implementation.',

      'Enhancing career readiness with courses aimed at transitioning effectively from education to employment in the cloud technology sector.',
    ],
  },
  {
    title: 'Company',
    company_name: 'MidnightByte Solutions',
    icon: mbs,
    iconBg: '#7ed6df',
    points: [
      "My company provides innovative customer-to-business solutions through tailored web development services, ensuring clients' needs are effectively met.",

      'We expand service offerings to include app development, catering to the growing demand for mobile solutions in business operations.',

      'By utilizing the latest technological trends, we deliver cutting-edge and scalable solutions that keep clients competitive in their respective markets.',

      'A client-centered approach is emphasized, focusing on creating dynamic and user-friendly interfaces that enhance user engagement and business performance.',
    ],
  },
  {
    title: 'Interests',
    company_name: "Pc's and tech",
    icon: pc,
    iconBg: '#a2d2ff',
    points: [
      'Passionate about building PCs, dedicating spare time to assembling and optimizing custom computer systems for various needs.',

      'Continuously learning about new technologies, staying ahead of trends and innovations in the tech industry.',

      'Interested in exploring how emerging tech can be integrated into current projects, enhancing functionality and user experience.',

      'I enjoy the challenge of troubleshooting and improving systems, applying a problem-solving mindset to both personal and professional projects.',
    ],
  },
];

export const socialLinks = [
  {
    name: 'Contact',
    iconUrl: contact,
    link: '/contact',
  },
  {
    name: 'GitHub',
    iconUrl: github,
    link: 'https://github.com/andyV-323',
  },
  {
    name: 'LinkedIn',
    iconUrl: linkedin,
    link: 'https://linkedin.com/in/andyvalencia',
  },
];

export const projects = {
  images: [
    // Front
    {
      position: [-0.8, 0, -0.6],
      rotation: [0, 0, 0],
      url: 'images/img1_.png',
      text: 'https://grbphub.online',
    },
    // Back
    {
      position: [0, 0, 1.5],
      rotation: [0, 0, 0],
      url: 'images/img2_.png',
      text: 'https://grsquads.xyz',
    },
    {
      position: [0.8, 0, -0.6],
      rotation: [0, 0, 0],
      url: 'images/img3_.png',
      text: 'https://fitnessnhealthclub.netlify.app',
    },
    // Left
    {
      position: [-1.75, 0, 0.25],
      rotation: [0, Math.PI / 2.5, 0],
      url: 'images/img4_.png',
      text: 'https://titantronhub.com',
    },
    {
      position: [-2.15, 0, 1.5],
      rotation: [0, Math.PI / 2.5, 0],
      url: 'images/img5_.png',
      text: 'https://github.com/andyV-323/Harbor-Distribution-Playbook/tree/main',
    },
    {
      position: [-2, 0, 2.75],
      rotation: [0, Math.PI / 2.5, 0],
      url: 'images/img6_.png',
      text: 'https://github.com/andyV-323/StarHoard',
    },
    // Right
    {
      position: [1.75, 0, 0.25],
      rotation: [0, -Math.PI / 2.5, 0],
      url: 'images/img7_.png',
      text: 'https://youtube.com/shorts/6Qg5B3_mwvI?feature=share',
    },
    {
      position: [2.15, 0, 1.5],
      rotation: [0, -Math.PI / 2.5, 0],
      url: 'images/img8_.png',
      text: 'https://youtube323.netlify.app/',
    },
    {
      position: [2, 0, 2.75],
      rotation: [0, -Math.PI / 2.5, 0],
      url: 'images/img9_.png',
      text: 'https://github.com/andyV-323/Dice-iOS',
    },
  ],
};
