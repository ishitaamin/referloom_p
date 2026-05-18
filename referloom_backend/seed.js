// referloom_backend/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";

// Import Models
import User from "./models/User.js";
import Project from "./models/Project.js";
import Job from "./models/Job.js";
import Mentorship from "./models/Mentorship.js";
import CollabPost from "./models/CollabPost.js";
import Application from "./models/Application.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log("🔥 Connected to DB. Initiating Database Wipe...");

    // 1. DELETE ENTIRE DATABASE COLLECTIONS
    await User.deleteMany({});
    await Project.deleteMany({});
    await Job.deleteMany({});
    await Mentorship.deleteMany({});
    await CollabPost.deleteMany({});
    await Application.deleteMany({});
    
    console.log("🗑️  All existing data cleared.");

    const salt = await bcrypt.genSalt(10);
    const defaultPassword = await bcrypt.hash("Password@123", salt);

    // ==========================================
    // 🎓 PHASE 1: SEEDING STUDENTS
    // ==========================================
    console.log("🌱 Seeding Students...");

    // Student 1: The "Perfect Match" (Full Stack MERN)
    const student1 = new User({
      fullName: "Aarav Sharma",
      email: "aarav@test.com",
      password: defaultPassword,
      role: "student",
      isVerified: true,
      isProfileComplete: true,
      headline: "MERN Stack Developer | React Native Enthusiast",
      bio: "I love building scalable web applications and have hands-on experience with frontend and backend technologies.",
      visibilityMode: "public",
      studentDetails: {
        university: "Navrachana University",
        course: "B.Tech Computer Science",
        semester: "6th",
        skills: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "Tailwind CSS"],
        experience: [{
          company: "TechNova Solutions",
          role: "Frontend Intern",
          startDate: "Jun 2023",
          endDate: "Aug 2023",
          description: "Built responsive dashboards using React and Tailwind CSS."
        }],
        careerPreferences: {
          fields: ["Full Stack (MERN)"],
          jobTypes: ["Summer Internship", "Full-Time Role"],
          timeline: ["Immediately"]
        },
        aiCareerRoadmap: [
          "🔥 Your Tech Stack, Experience, and Projects perfectly align with your goals! Focus entirely on networking and applying.",
          "💡 Make sure to highlight your E-Commerce Platform project in your resume, as it perfectly demonstrates MERN capabilities to recruiters."
        ]
      }
    });

    // Student 2: The "Missing Core Skills" (Data Science Pivot)
    const student2 = new User({
      fullName: "Priya Patel",
      email: "priya@test.com",
      password: defaultPassword,
      role: "student",
      isVerified: true,
      isProfileComplete: true,
      headline: "Aspiring Data Scientist | ML Enthusiast",
      bio: "Fascinated by data patterns and artificial intelligence.",
      visibilityMode: "public",
      studentDetails: {
        university: "Navrachana University",
        course: "B.Tech Computer Science",
        semester: "4th",
        skills: ["C++", "Java", "HTML", "CSS"], 
        experience: [],
        careerPreferences: {
          fields: ["Data Science & Analytics"], 
          jobTypes: ["Summer Internship"],
          timeline: ["Within 6 Months"]
        },
        aiCareerRoadmap: [
          "To achieve your goal in Data Science, you have a gap in core technologies. Prioritize learning: Python, SQL, and Pandas.",
          "Recruiters filter heavily by proof of work. Start by building a foundational project tailored specifically for Data Science.",
          "Targeting Internships with no prior experience is highly competitive. Shift your focus to building datasets or ML models immediately."
        ]
      }
    });

    // Student 3: Fixed to be a "High Match" for Frontend Internships
    const student3 = new User({
      fullName: "Rohan Desai",
      email: "rohan@test.com",
      password: defaultPassword,
      role: "student",
      isVerified: true,
      isProfileComplete: true,
      headline: "Frontend UI Developer",
      bio: "Passionate about pixel-perfect UI and component-driven architecture using React.",
      visibilityMode: "public",
      studentDetails: {
        university: "Navrachana University",
        course: "BCA",
        semester: "6th",
        skills: ["React", "HTML", "CSS", "JavaScript", "Figma"],
        experience: [], 
        careerPreferences: {
          fields: ["Frontend Engineering"],
          jobTypes: ["Summer Internship"], 
          timeline: ["Immediately"]
        }
      }
    });

    // Student 4: Blank Slate
    const student4 = new User({
      fullName: "Neha Gupta",
      email: "neha@test.com",
      password: defaultPassword,
      role: "student",
      isVerified: true,
      isProfileComplete: false,
      headline: "",
      bio: "",
      visibilityMode: "private",
      studentDetails: {
        university: "Navrachana University",
        course: "B.Tech IT",
        semester: "2nd",
        skills: [],
        experience: [],
        careerPreferences: {} 
      }
    });

    const savedStudents = await User.insertMany([student1, student2, student3, student4]);

    // --- SEED STUDENT PROJECTS ---
    const proj1 = new Project({
      student: savedStudents[0]._id, // Aarav
      title: "E-Commerce Platform",
      description: "A full-stack application with user authentication, cart management, and Razorpay integration.",
      tags: ["React", "Node.js", "MongoDB", "Express", "Razorpay"],
      githubLink: "https://github.com/test/ecommerce",
      liveLink: "https://test-ecommerce.com"
    });

    const proj2 = new Project({
      student: savedStudents[1]._id, // Priya
      title: "Library Management System",
      description: "A simple desktop application to manage books.",
      tags: ["Java", "Swing", "MySQL"],
      githubLink: "https://github.com/test/library"
    });

    const proj3 = new Project({
      student: savedStudents[2]._id, // Rohan (Added to boost his score)
      title: "Personal Portfolio UI",
      description: "A highly interactive and responsive portfolio built using React and modern CSS animations.",
      tags: ["React", "CSS", "HTML", "Framer Motion"],
      githubLink: "https://github.com/test/portfolio"
    });

    const savedProjects = await Project.insertMany([proj1, proj2, proj3]);

    // Link projects back to students
    savedStudents[0].projects.push(savedProjects[0]._id);
    savedStudents[1].projects.push(savedProjects[1]._id);
    savedStudents[2].projects.push(savedProjects[2]._id);
    await savedStudents[0].save();
    await savedStudents[1].save();
    await savedStudents[2].save();

    // --- SEED COLLAB BOARD POSTS ---
    await CollabPost.create([
      {
        author: savedStudents[0]._id, 
        type: "Hackathon", 
        title: "Looking for a UI/UX Designer for a Hackathon!",
        description: "We have the backend sorted using Node.js, but need someone to design the Figma screens for our upcoming Hackathon. Let me know if interested!",
        roles: ["UI/UX Designer"], 
        isActive: true 
      },
      {
        author: savedStudents[1]._id, 
        type: "Project", 
        title: "Need help setting up a Python environment",
        description: "I am trying to learn Data Science but getting errors installing Pandas. Can anyone help via a quick chat?",
        roles: ["Python Mentor"], 
        isActive: true
      },
      {
        author: savedStudents[2]._id, 
        type: "Study Group", 
        title: "DSA Study Group for Placements",
        description: "Starting a daily LeetCode grind focusing on Arrays and Trees. Anyone want to join and hold each other accountable?",
        roles: ["Coding Buddy"], 
        isActive: true
      }
    ]);

    // ==========================================
    // 🏢 PHASE 2: SEEDING COMPANIES & ALUMNI
    // ==========================================
    console.log("🏢 Seeding Companies and Alumni...");

    const alumni1 = new User({
      fullName: "Vikram Singh",
      email: "vikram@alumni.com",
      password: defaultPassword,
      role: "alumni",
      isVerified: true,
      isProfileComplete: true,
      headline: "Senior Backend Engineer @ Google",
      bio: "I build scalable systems and love mentoring juniors. Happy to refer strong candidates.",
      visibilityMode: "public",
      alumniDetails: { graduationYear: "2020", company: "Google", role: "Senior Software Engineer" }
    });

    const alumni2 = new User({
      fullName: "Anjali Verma",
      email: "anjali@alumni.com",
      password: defaultPassword,
      role: "alumni",
      isVerified: true,
      isProfileComplete: true,
      headline: "Frontend UI Developer @ Amazon",
      bio: "Specializing in React and Web Performance. Reach out for resume reviews!",
      visibilityMode: "public",
      alumniDetails: { graduationYear: "2022", company: "Amazon", role: "Frontend Developer" }
    });

    const company1 = new User({
      fullName: "TechNova HR",
      email: "hr@technova.com",
      password: defaultPassword,
      role: "company",
      isVerified: true,
      isProfileComplete: true,
      headline: "TechNova Recruiting",
      bio: "We are a fast-growing startup building next-gen e-commerce solutions.",
      visibilityMode: "public",
      companyDetails: { companyName: "TechNova Solutions", hrContact: "Sarah Jenkins", industryType: "Technology" }
    });

    const company2 = new User({
      fullName: "DataSphere AI HR",
      email: "careers@datasphere.com",
      password: defaultPassword,
      role: "company",
      isVerified: true,
      isProfileComplete: true,
      headline: "Hiring Top Data Talent",
      bio: "Pioneering machine learning models for the finance sector.",
      visibilityMode: "public",
      companyDetails: { companyName: "DataSphere AI", hrContact: "Michael Ross", industryType: "Artificial Intelligence" }
    });

    const savedProfessionals = await User.insertMany([alumni1, alumni2, company1, company2]);

    // ==========================================
    // 💼 PHASE 3: SEEDING JOBS (For AI Match Testing)
    // ==========================================
    console.log("💼 Seeding Jobs...");

    const jobsToInsert = [
      // Job 1: Perfect match for Aarav (95%+)
      {
        postedBy: savedProfessionals[2]._id, // TechNova
        title: "MERN Stack Intern",
        companyName: "TechNova Solutions",
        description: "Looking for an intern to help build our React/Node frontend and backend.",
        requirements: ["React", "Node.js", "Express", "MongoDB", "JavaScript"], 
        jobType: "Internship",
        location: "Remote (Global)",
        salaryRange: "₹20,000/month",
        status: "open"
      },
      // Job 2: Another strong match for Aarav (85%+)
      {
        postedBy: savedProfessionals[2]._id, // TechNova
        title: "React Web Developer",
        companyName: "TechNova Solutions",
        description: "Full-Time role for building dashboards.",
        requirements: ["React", "JavaScript", "Tailwind CSS", "UI/UX"], 
        jobType: "Full-Time Role",
        location: "Bangalore, KA",
        salaryRange: "₹8L - ₹12L",
        status: "open"
      },
      // Job 3: Perfect match for Rohan (85%+)
      {
        postedBy: savedProfessionals[0]._id, // Google Alumni
        title: "Frontend Engineering Intern",
        companyName: "Google",
        description: "Join the search team to build accessible UI components.",
        requirements: ["React", "HTML", "CSS", "JavaScript"], 
        jobType: "Summer Internship",
        location: "Hyderabad, TS",
        salaryRange: "₹60,000/month",
        status: "open"
      },
      // Job 4: The Data Science role (Low score for Aarav, tests Missing Skills for Priya)
      {
        postedBy: savedProfessionals[3]._id, // DataSphere
        title: "Data Science Intern",
        companyName: "DataSphere AI",
        description: "Join our ML team to clean datasets and build predictive models.",
        requirements: ["Python", "SQL", "Pandas", "Machine Learning"], 
        jobType: "Summer Internship",
        location: "Bangalore, KA",
        salaryRange: "₹30,000/month",
        status: "open"
      },
      // Job 5: Senior Role (Tests the "No Experience" penalty)
      {
        postedBy: savedProfessionals[0]._id, // Vikram
        title: "Senior System Architect",
        companyName: "Google",
        description: "Looking for a seasoned backend engineer to lead architecture.",
        requirements: ["Node.js", "System Design", "AWS", "Docker"],
        jobType: "Full-Time Role",
        location: "Remote (Global)",
        salaryRange: "₹40L - ₹60L",
        status: "open"
      }
    ];

    const savedJobs = await Job.insertMany(jobsToInsert);

    // ==========================================
    // 🤝 PHASE 4: SEEDING MENTORSHIP & APPLICATIONS
    // ==========================================
    console.log("🤝 Seeding Mentorships and Applications...");

    // Aarav requests mentorship from Vikram
    await Mentorship.create({
      student: savedStudents[0]._id,
      alumni: savedProfessionals[0]._id,
      message: "Hi Vikram, I am highly interested in backend architecture at scale. Would love your guidance on my current MERN project.",
      status: "pending"
    });

    // Rohan requests mentorship from Anjali
    await Mentorship.create({
      student: savedStudents[2]._id,
      alumni: savedProfessionals[1]._id,
      message: "Hi Anjali, I love your work at Amazon! Could you review my React portfolio?",
      status: "pending"
    });

    // Aarav applies to the MERN Intern job
    await Application.create({
      job: savedJobs[0]._id,
      student: savedStudents[0]._id, 
      fitScore: 98,                  
      status: "applied",
      resumeLink: "https://test.com/aarav-resume.pdf",
      coverLetter: "I have built a fully functional MERN e-commerce app and would love to bring my skills to TechNova."
    });

    console.log("🎉 DATABASE SEEDED COMPLETELY! 🎉");
    process.exit(0);

  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
};

seedDatabase();