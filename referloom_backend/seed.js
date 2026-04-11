import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Job from './models/Job.js';
import Project from './models/Project.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const seedDatabase = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is undefined. Check your .env file!");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`📡 MongoDB Connected: ${conn.connection.host}`);
    
    // 1. Clear existing data
    console.log("🧹 Clearing old database records...");
    await User.deleteMany();
    await Job.deleteMany();
    await Project.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash("password123", salt);

    // 2. Create Users
    console.log("👤 Creating Users...");
    const studentUser = await User.create({
      email: "ishita@navrachana.edu",
      password,
      role: "student",
      fullName: "Ishita Amin",
      isVerified: true,
      visibilityMode: "public",
      studentDetails: { 
        course: "B.Tech Computer Science and Engineering", 
        semester: 8, 
        university: "Navrachana University",
        skills: ["React Native", "MongoDB", "Express", "Node.js", "Python", "LangGraph", "AWS"],
        experience: [
          {
            company: "SKILLTELLIGENT",
            role: "Software Developer Intern",
            duration: "January 2026 - Present",
            description: "Working on enterprise software solutions and development."
          },
          {
            company: "PARTHVITECH INNOVATIVES LLP",
            role: "Software Developer Intern",
            duration: "December 2022 - March 2023",
            description: "Assisted in software development lifecycle and bug fixing."
          }
        ]
      }
    });

    const alumniUser = await User.create({
      email: "alumni@skilltelligent.com",
      password,
      role: "alumni",
      fullName: "Rahul Desai",
      isVerified: true,
      professionalDetails: { 
        companyName: "SKILLTELLIGENT", 
        designation: "Senior Software Engineer", 
        experienceYears: 4 
      }
    });

    const companyUser = await User.create({
      email: "careers@vianetwork.com",
      password,
      role: "company",
      fullName: "Via Network HR",
      isVerified: true,
      professionalDetails: { 
        companyName: "Via Network", 
        designation: "Technical Recruiter" 
      }
    });

    // 3. Create Projects (MATCHING YOUR PROJECT SCHEMA)
    console.log("📁 Creating Verified Projects...");
    const projects = await Project.create([
      {
        student: studentUser._id, // ✅ Changed from studentId to student
        title: "Referloom Platform",
        description: "A project-first, verified university ecosystem built with React Native and Node.js.",
        tags: ["React Native", "Node.js", "MongoDB", "Express"],
        visibility: "public"
      },
      {
        student: studentUser._id, // ✅ Changed from studentId to student
        title: "NOVA Jewellery",
        description: "Luxury e-commerce application featuring JWT authentication and Razorpay.",
        tags: ["React", "Node.js", "MongoDB"],
        visibility: "public"
      },
      {
        student: studentUser._id, // ✅ Changed from studentId to student
        title: "Techmate AI Search Agent",
        description: "Autonomous AI web search agent utilizing multi-agent architecture.",
        tags: ["Python", "LangGraph", "Agentic AI", "Streamlit"],
        visibility: "public"
      },
      {
        student: studentUser._id, // ✅ Changed from studentId to student
        title: "PizzaSalesIQ Dashboard",
        description: "Business intelligence project analyzing 1.4 million sales records.",
        tags: ["AWS", "Pandas", "Data Science"],
        visibility: "public"
      }
    ]);

    // 4. Link Projects to Student
    await User.findByIdAndUpdate(studentUser._id, {
      $push: { projects: { $each: projects.map(p => p._id) } }
    });

    // 5. Create Jobs (MATCHING YOUR JOB SCHEMA)
    console.log("💼 Posting Jobs...");
    await Job.create([
      {
        postedBy: alumniUser._id, // ✅ Changed from creatorId to postedBy
        title: "Mobile App Developer (React Native)",
        companyName: "SKILLTELLIGENT", // ✅ Changed from company to companyName
        location: "Remote",
        jobType: "Full-Time", // ✅ Changed from type to jobType
        description: "Looking for a mobile developer with strong React Native experience.",
        requirements: ["React Native", "Node.js", "MongoDB"] // ✅ Changed from requiredSkills to requirements
      },
      {
        postedBy: companyUser._id,
        title: "AI Engineer / Data Scientist",
        companyName: "Via Network",
        location: "Bangalore, India",
        jobType: "Internship",
        description: "Passionate about intelligent automation, RAG pipelines, and data analytics.",
        requirements: ["Python", "LangGraph", "Agentic AI", "Pandas"]
      },
      {
        postedBy: companyUser._id,
        title: "Frontend Vue.js Developer",
        companyName: "Via Network",
        location: "Remote",
        jobType: "Contract",
        description: "Building fast interfaces using Vue.js and Firebase.",
        requirements: ["Vue.js", "Firebase", "Tailwind CSS"]
      }
    ]);

    console.log("✅ Database Seeded Successfully with Realistic Data!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();