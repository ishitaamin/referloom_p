// referloom_backend/utils/aiEngine.js

// 🧠 1. Smart String Normalizer & Alias Mapper
// This strips all spaces, hyphens, and dots so "Node.js", "node js", and "nodejs" all match!
const normalize = (str) => str?.toLowerCase().replace(/[^a-z0-9]/g, '') || '';

// Updated Industry Knowledge Base to map to the new UI options
const INDUSTRY_STANDARDS = {
  'fullstack': ['react', 'node', 'express', 'mongodb', 'javascript', 'api', 'typescript', 'sql', 'nextjs'],
  'frontend': ['react', 'html', 'css', 'javascript', 'ui', 'ux', 'tailwind', 'bootstrap', 'nextjs', 'vue'],
  'backend': ['node', 'python', 'java', 'sql', 'mongodb', 'api', 'express', 'django', 'aws', 'postgres', 'docker'],
  'datascience': ['python', 'sql', 'machine learning', 'data', 'pandas', 'numpy', 'statistics', 'matplotlib'],
  'machinelearning': ['python', 'ai', 'tensorflow', 'pytorch', 'nlp', 'machine learning', 'deep learning'],
  'mobile': ['react native', 'flutter', 'swift', 'kotlin', 'android', 'ios', 'mobile'],
  'uiux': ['figma', 'adobe', 'wireframing', 'prototyping', 'ui', 'ux', 'design'],
  'devops': ['aws', 'docker', 'kubernetes', 'cicd', 'linux', 'git', 'cloud'],
  'cybersecurity': ['security', 'network', 'ethical hacking', 'linux', 'penetration testing']
};

// Helper: Extract and NORMALIZE all text from user for keyword matching
const getUserTextCorpus = (user) => {
  const student = user.studentDetails || {};
  let corpus = `${user.headline} ${user.bio} `;
  (user.projects || []).forEach(p => corpus += `${p.title} ${p.description} ${p.tags?.join(' ')} `);
  (student.experience || []).forEach(e => corpus += `${e.role} ${e.description} `);
  return normalize(corpus); // 🔥 FIX: Corpus is now normalized!
};

// ==========================================
// 🔥 FEATURE 1: CAREER-ALIGNED PROFILE STRENGTH
// ==========================================
export const calculateProfileStrength = (user) => {
  let score = 0;
  let suggestions = [];
  const student = user.studentDetails || {};
  const preferences = student.careerPreferences || {};
  const targetFields = preferences.fields || [];

  let baseScore = 0;
  if (user.fullName) baseScore += 5;
  if (user.profileImage) baseScore += 10;
  if (user.headline && user.bio) baseScore += 10;
  if (student.university) baseScore += 5;
  score += baseScore;

  if (baseScore < 30) {
    suggestions.push("Complete your basic profile (Photo, Headline, Bio) to establish trust.");
  }

  if (targetFields.length === 0) {
    suggestions.push("Set your Career Goals to unlock AI profile scoring and personalized job matches.");
    if (student.skills?.length > 0) score += 20;
    if (user.projects?.length > 0) score += 20;
    return { score: Math.min(score, 60), suggestions }; 
  }

  const userSkills = (student.skills || []).map(normalize);
  let requiredSkills = new Set();

  targetFields.forEach(field => {
    const fieldKey = normalize(field);
    Object.keys(INDUSTRY_STANDARDS).forEach(key => {
      if (fieldKey.includes(key) || key.includes(fieldKey)) {
        INDUSTRY_STANDARDS[key].forEach(s => requiredSkills.add(normalize(s)));
      }
    });
  });

  const requiredArray = Array.from(requiredSkills);
  let matchedSkills = [];
  let missingSkills = [];

  if (requiredArray.length > 0) {
    requiredArray.forEach(req => {
      if (userSkills.some(skill => skill.includes(req) || req.includes(skill))) {
        matchedSkills.push(req);
      } else {
        missingSkills.push(req);
      }
    });

    const skillRatio = Math.min(matchedSkills.length / Math.min(requiredArray.length, 6), 1);
    score += Math.round(skillRatio * 40);

    if (missingSkills.length > 0) {
      // Re-capitalize for display
      const readableMissing = missingSkills.slice(0, 3).map(s => s.charAt(0).toUpperCase() + s.slice(1));
      suggestions.push(`To match your goal in ${targetFields[0]}, add skills like: ${readableMissing.join(', ')}.`);
    }
  } else {
    if (userSkills.length >= 3) score += 40; 
  }

  // 🔥 FIX: Normalize the local corpus for Profile Strength
  let rawCorpus = "";
  (user.projects || []).forEach(p => rawCorpus += `${p.title} ${p.description} ${p.tags?.join(' ')} `);
  (student.experience || []).forEach(e => rawCorpus += `${e.role} ${e.description} `);
  const normalizedCorpus = normalize(rawCorpus);

  let projectScore = 0;
  const hasProjects = user.projects && user.projects.length > 0;
  const hasExperience = student.experience && student.experience.length > 0;
  let hasRelevance = false;
  
  requiredArray.forEach(req => {
    if (req.length > 2 && normalizedCorpus.includes(req)) hasRelevance = true;
  });

  if (hasProjects && hasRelevance) {
    projectScore += 20;
  } else if (hasProjects) {
    projectScore += 10;
    suggestions.push(`Your projects don't explicitly mention the core skills for ${targetFields[0]}. Update your project descriptions!`);
  } else {
    suggestions.push("Upload at least one project related to your career goals to stand out to recruiters.");
  }

  if (hasExperience) {
    projectScore += 10;
  } else if (preferences.jobTypes?.some(type => normalize(type).includes('fulltime'))) {
    suggestions.push("Targeting Full-Time roles? Try to add past internships or freelance work to your Experience section.");
  }

  score += projectScore;

  if (score >= 90) {
    suggestions.unshift("🔥 Your profile is exceptionally well-aligned with your career goals!");
  }

  return {
    score: Math.min(Math.round(score), 100),
    suggestions: suggestions.slice(0, 3) 
  };
};

// ==========================================
// 🚀 FEATURE 2: ADVANCED JOB MATCH CALCULATOR
// ==========================================
export const calculateJobMatch = (user, job) => {
  let score = 0;
  let suggestions = [];
  
  const student = user.studentDetails || {};
  const userSkills = (student.skills || []).map(normalize);
  const jobRequirements = (job.requirements || []).map(normalize);
  const prefs = student.careerPreferences || {};

  let matchedSkills = [];
  let missingSkills = [];

  jobRequirements.forEach(req => {
    const isMatch = userSkills.some(skill => skill.includes(req) || req.includes(skill));
    if (isMatch) matchedSkills.push(req);
    else missingSkills.push(req);
  });

  if (jobRequirements.length > 0) {
    score += (matchedSkills.length / jobRequirements.length) * 50;
  } else {
    score += 50; 
  }

  const userCorpus = getUserTextCorpus(user); // 🔥 Now correctly normalized
  let implicitMatches = 0;
  
  missingSkills.forEach(missingReq => {
    if (userCorpus.includes(missingReq)) {
      implicitMatches++;
      missingSkills = missingSkills.filter(s => s !== missingReq);
      matchedSkills.push(missingReq);
    }
  });
  
  score += Math.min((implicitMatches * 5), 20); 

  const hasExperience = student.experience && student.experience.length > 0;
  const hasProjects = user.projects && user.projects.length > 0;
  const jobTitleLower = normalize(job.title);

  if (normalize(job.jobType).includes('intern')) {
    if (hasProjects) score += 20;
    else if (hasExperience) score += 20;
  } else {
    if (hasExperience) score += 20;
    else if (hasProjects && !jobTitleLower.includes('senior')) score += 10; 
  }

  const targetJobTypes = (prefs.jobTypes || []).map(normalize);
  if (targetJobTypes.some(type => normalize(job.jobType).includes(type))) {
    score += 10;
  }

  const fitScore = Math.min(Math.round(score), 99);

  if (missingSkills.length > 0) {
    const rawMissing = job.requirements.filter(r => missingSkills.includes(normalize(r)));
    suggestions.push(`Missing Core Skills: Consider brushing up on ${rawMissing.slice(0, 2).join(' and ')}.`);
  } else {
    suggestions.push("🔥 100% Skill Match! Your tech stack aligns perfectly.");
  }

  if (implicitMatches > 0) {
    suggestions.push(`💡 We noticed you used some required skills in your projects. Make sure to add them to your official Skills list!`);
  }

  if (!hasExperience && (jobTitleLower.includes('senior') || jobTitleLower.includes('lead'))) {
    suggestions.push("⚠️ This role usually requires industry experience. Highlight your most complex projects to stand out.");
  }

  if (fitScore >= 85) {
    suggestions.push("⭐ Top Tier Candidate! Your profile and career goals strongly align with this company.");
  }

  return { fitScore, suggestions };
};

// ==========================================
// 🗺️ FEATURE 3: DEEP-CONTENT CAREER ROADMAP
// ==========================================
export const generateCareerRoadmap = (user) => {
  const student = user.studentDetails || {};
  const preferences = student.careerPreferences || {};
  const targetFields = preferences.fields || [];
  const userCorpus = getUserTextCorpus(user); // 🔥 Now correctly normalized

  if (targetFields.length === 0) {
    return ["Please set your career goals first so we can generate a personalized roadmap."];
  }

  const roadmap = [];
  const userSkills = (student.skills || []).map(normalize);
  let requiredSkills = new Set();

  targetFields.forEach(field => {
    const fieldKey = normalize(field);
    Object.keys(INDUSTRY_STANDARDS).forEach(key => {
      if (fieldKey.includes(key) || key.includes(fieldKey)) {
        INDUSTRY_STANDARDS[key].forEach(s => requiredSkills.add(normalize(s)));
      }
    });
  });

  const missingSkills = Array.from(requiredSkills).filter(req =>
    !userSkills.some(skill => skill.includes(req) || req.includes(skill)) &&
    !userCorpus.includes(req) 
  );

  if (missingSkills.length > 0) {
    roadmap.push(`To achieve your goal in ${targetFields[0]}, you have a gap in core technologies. Prioritize learning: ${missingSkills.slice(0, 3).join(', ')}.`);
  }

  let projectRelevance = 0;
  targetFields.forEach(field => {
    if (userCorpus.includes(normalize(field))) projectRelevance++;
  });

  if (user.projects && user.projects.length > 0) {
    if (projectRelevance === 0 && missingSkills.length > 0) {
      roadmap.push(`You have active projects, but their descriptions don't strongly reflect ${targetFields[0]} technologies. Build a specialized project that explicitly uses your target tech stack.`);
    } else if (missingSkills.length > 0) {
      roadmap.push(`Your current projects demonstrate good foundational knowledge. To level up, try integrating ${missingSkills[0]} into your next build to prove you can handle it in production.`);
    }
  } else {
    roadmap.push(`Recruiters filter heavily by proof of work. Start by building a foundational project tailored specifically for ${targetFields[0]} roles.`);
  }

  if (!student.experience || student.experience.length === 0) {
    if (preferences.jobTypes?.some(t => normalize(t).includes('fulltime'))) {
        roadmap.push("Targeting Full-Time roles without formal experience is highly competitive. Consider contributing to Open Source or doing freelance work to simulate real-world environments.");
    }
  }

  if (roadmap.length === 0) {
    roadmap.push("Your profile demonstrates deep competence in your target fields! Your projects and skills are perfectly aligned. Focus entirely on networking and applying.");
  }

  return roadmap.slice(0, 4); 
};