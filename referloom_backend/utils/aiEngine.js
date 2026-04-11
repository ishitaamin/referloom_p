// referloom_backend/utils/aiEngine.js

/**
 * Simulates an AI Engine evaluating a student's fit for a job.
 * @param {Object} student - The user object (populated with projects)
 * @param {Object} job - The job posting object
 * @returns {Object} { fitScore: Number, aiSuggestions: Array<String> }
 */
export const calculateFitScore = (student, job) => {
    // 1. Gather Student's combined tech stack (from skills and all project tags)
    const studentSkills = new Set(
      (student.studentDetails?.skills || []).map(s => s.toLowerCase().trim())
    );
    
    (student.projects || []).forEach(project => {
      if (project.tags) {
        project.tags.forEach(tag => studentSkills.add(tag.toLowerCase().trim()));
      }
    });
  
    // 2. Compare against Job Required Skills
    let matchedSkills = 0;
    const missingSkills = [];
  
    const requiredSkills = job.requiredSkills || [];
    
    requiredSkills.forEach(reqSkill => {
      if (studentSkills.has(reqSkill.toLowerCase().trim())) {
        matchedSkills++;
      } else {
        missingSkills.push(reqSkill);
      }
    });
  
    // 3. Calculate Base Score (Percentage of required skills met)
    let baseScore = requiredSkills.length > 0 
      ? Math.round((matchedSkills / requiredSkills.length) * 100)
      : 100;
  
    // Add a slight boost if they have actual projects (proves experience, not just claimed skills)
    if (student.projects && student.projects.length > 0) {
      baseScore = Math.min(100, baseScore + (student.projects.length * 5));
    }
  
    // 4. Generate AI Actionable Feedback
    const aiSuggestions = [];
  
    if (baseScore >= 80) {
      aiSuggestions.push("Great match! Your verified projects strongly align with the core requirements of this role.");
    }
  
    if (missingSkills.length > 0) {
      const topMissing = missingSkills.slice(0, 2).join(" and ");
      aiSuggestions.push(`Adding a project that utilizes ${topMissing} will significantly boost your score.`);
    }
  
    if (!student.projects || student.projects.length === 0) {
      aiSuggestions.push("You have claimed skills but no projects. Upload a project with GitHub/Demo links to prove your capabilities to recruiters.");
    }
  
    return {
      fitScore: baseScore,
      aiSuggestions
    };
  };