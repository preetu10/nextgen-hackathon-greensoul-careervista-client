import React, { useState, useRef } from "react";
import { Download, Mail } from "lucide-react";
import useAuth from "../../customHooks/useAuth";
import useAxiosSecure from "../../customHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const CVAssistant = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userData, setUserData] = useState("");

  const cvRef = useRef(null);
  const [selectedSummary, setSelectedSummary] = useState(0);

  const { isPending, data: userPro = {} } = useQuery({
    queryKey: ["userPro", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/user/${user?.email}`);
      setUserData(userPro?.careerTrack);
      return res.data;
    },
  });
  const [cvData, setCvData] = useState(null);

  React.useEffect(() => {
    if (userPro) {
      setCvData({ ...userPro });
    }
  }, [userPro]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-dots loading-lg text-[#048998]"></span>
      </div>
    );
  }

  let projects = [];
  try {
    if (Array.isArray(userPro?.projects)) {
      projects = userPro.projects;
    } else if (typeof userPro?.projects === "string") {
      projects = JSON.parse(userPro.projects);
    }
  } catch {
    projects = [];
  }

  const summaryDatabase = {
    "Web Development": [
      "Passionate web developer with expertise in modern frontend and backend technologies. Skilled in creating responsive, user-centric applications with clean code and scalable architecture. Committed to continuous learning and delivering high-quality web solutions.",
      "Results-driven web developer specializing in full-stack development with proficiency in JavaScript frameworks and database management. Experienced in building robust web applications that enhance user engagement and streamline business processes.",
      "Creative and detail-oriented web developer with a strong foundation in both client-side and server-side technologies. Adept at translating design concepts into functional, efficient web applications while maintaining best practices and industry standards.",
    ],
    "Mobile App Development": [
      "Innovative mobile app developer skilled in creating intuitive, high-performance applications for Android and iOS platforms. Experienced in implementing cutting-edge features and ensuring seamless user experiences across diverse mobile devices.",
      "Dedicated mobile application developer with expertise in native and cross-platform development. Proficient in designing scalable mobile solutions that prioritize user engagement, performance optimization, and modern design principles.",
      "Dynamic mobile developer specializing in building feature-rich applications with focus on usability and performance. Strong background in mobile UI/UX implementation and integration of advanced functionalities.",
    ],
    "Data Science": [
      "Analytical data scientist with strong statistical knowledge and programming skills. Experienced in extracting actionable insights from complex datasets using machine learning techniques and data visualization tools to drive informed decision-making.",
      "Detail-oriented data science professional skilled in predictive modeling, statistical analysis, and data mining. Proficient in transforming raw data into meaningful insights that support strategic business objectives.",
      "Results-focused data scientist with expertise in applying advanced analytics and machine learning algorithms to solve real-world problems. Committed to delivering data-driven solutions that create measurable business value.",
    ],
    "AI / ML": [
      "Forward-thinking AI/ML engineer with expertise in developing intelligent systems and implementing machine learning models. Skilled in deep learning, natural language processing, and computer vision with a passion for solving complex problems through AI.",
      "Innovative machine learning specialist focused on building and deploying scalable AI solutions. Experienced in model development, optimization, and integration with strong foundation in neural networks and algorithm design.",
      "Dedicated AI/ML practitioner with proficiency in developing cutting-edge machine learning applications. Adept at leveraging advanced algorithms and frameworks to create intelligent systems that drive innovation.",
    ],
    "UI/UX Design": [
      "Creative UI/UX designer passionate about crafting intuitive, visually appealing digital experiences. Skilled in user research, wireframing, and prototyping with a strong focus on accessibility and user-centered design principles.",
      "User-focused designer with expertise in creating seamless digital experiences across web and mobile platforms. Proficient in design thinking methodologies and translating user needs into elegant, functional interfaces.",
      "Detail-oriented UI/UX designer committed to delivering engaging, accessible designs that enhance user satisfaction. Experienced in conducting user research and iterating designs based on feedback and analytics.",
    ],
    "Graphic Design": [
      "Creative graphic designer with a keen eye for aesthetics and brand storytelling. Skilled in creating compelling visual content across digital and print media using industry-standard design tools and principles.",
      "Versatile graphic designer experienced in developing impactful visual solutions for diverse clients. Proficient in typography, color theory, and layout design with ability to translate concepts into memorable visual experiences.",
      "Innovative graphic designer passionate about creating visually stunning designs that communicate brand messages effectively. Strong background in both digital and traditional design mediums.",
    ],
    "Digital Marketing": [
      "Strategic digital marketer skilled in developing and executing data-driven marketing campaigns across multiple channels. Experienced in SEO, content marketing, and social media strategy with focus on measurable ROI.",
      "Results-oriented digital marketing professional with expertise in online brand building and audience engagement. Proficient in analytics, campaign optimization, and emerging digital marketing trends.",
      "Dynamic digital marketer adept at creating compelling marketing strategies that drive traffic, engagement, and conversions. Strong analytical skills combined with creative problem-solving abilities.",
    ],
    "Content Writing": [
      "Skilled content writer with ability to craft engaging, SEO-optimized content across various formats and industries. Experienced in research, storytelling, and adapting tone to different audiences and platforms.",
      "Versatile content creator specialized in producing high-quality written content that informs, engages, and converts. Strong research skills combined with creative writing abilities and attention to detail.",
      "Professional content writer passionate about creating compelling narratives and informative content. Adept at managing multiple projects while maintaining consistency and quality across all deliverables.",
    ],
    "Software Engineering": [
      "Dedicated software engineer with strong foundation in software development lifecycle and best coding practices. Skilled in designing, developing, and maintaining scalable software solutions using modern technologies and methodologies.",
      "Solution-oriented software engineer experienced in building robust applications and systems. Proficient in multiple programming languages with focus on clean code, testing, and continuous improvement.",
      "Innovative software engineer committed to developing efficient, maintainable software solutions. Strong problem-solving skills with experience in agile development and collaborative team environments.",
    ],
    Cybersecurity: [
      "Security-focused professional with expertise in identifying vulnerabilities and implementing robust security measures. Skilled in threat analysis, risk assessment, and developing strategies to protect organizational assets.",
      "Dedicated cybersecurity specialist committed to safeguarding digital infrastructure and sensitive data. Experienced in security auditing, incident response, and staying current with evolving cyber threats.",
      "Proactive cybersecurity professional with strong analytical skills and knowledge of security frameworks. Adept at implementing security best practices and educating teams on security awareness.",
    ],
    "Cloud Computing": [
      "Cloud-focused professional skilled in designing, deploying, and managing scalable cloud infrastructure. Experienced in cloud migration, optimization, and implementing best practices for cloud-native applications.",
      "Results-driven cloud engineer with expertise in major cloud platforms and DevOps practices. Proficient in automation, containerization, and building resilient cloud architectures.",
      "Innovative cloud specialist committed to leveraging cloud technologies for business transformation. Strong background in cloud security, cost optimization, and infrastructure as code.",
    ],
    "Business Analysis": [
      "Strategic business analyst skilled in bridging the gap between business needs and technical solutions. Experienced in requirements gathering, process improvement, and stakeholder management.",
      "Detail-oriented business analyst with strong analytical and communication skills. Proficient in data analysis, documentation, and translating business requirements into actionable insights.",
      "Results-focused business analyst committed to driving operational efficiency and business growth. Adept at identifying opportunities for improvement and facilitating change management.",
    ],
    "DevOps / System Administration": [
      "Experienced DevOps engineer skilled in automating workflows and improving deployment pipelines. Proficient in CI/CD, configuration management, and monitoring with focus on reliability and efficiency.",
      "Dedicated system administrator with expertise in maintaining robust IT infrastructure and implementing DevOps practices. Strong background in automation, troubleshooting, and system optimization.",
      "Proactive DevOps professional committed to streamlining development processes and ensuring system stability. Experienced in containerization, orchestration, and cloud infrastructure management.",
    ],
    "Finance & Accounting": [
      "Detail-oriented finance professional with strong analytical skills and expertise in financial reporting and analysis. Committed to maintaining accuracy and compliance while supporting strategic financial decisions.",
      "Results-driven accounting professional skilled in financial management, budgeting, and forecasting. Proficient in accounting software with strong attention to detail and commitment to regulatory compliance.",
      "Analytical finance specialist with expertise in financial planning and data-driven decision making. Experienced in cost analysis, risk assessment, and implementing financial controls.",
    ],
    "Human Resources (HR)": [
      "People-focused HR professional skilled in talent acquisition, employee relations, and organizational development. Committed to fostering positive workplace culture and supporting employee growth.",
      "Strategic HR specialist with expertise in recruitment, performance management, and HR policies. Strong interpersonal skills with focus on creating inclusive, productive work environments.",
      "Dedicated human resources professional experienced in managing full HR lifecycle from recruitment to retention. Proficient in HRIS systems and employment law with passion for developing talent.",
    ],
    "Education & Training": [
      "Passionate educator committed to creating engaging learning experiences and fostering student success. Skilled in curriculum development, instructional design, and adapting teaching methods to diverse learning styles.",
      "Experienced training professional with expertise in developing and delivering effective educational programs. Strong communication skills with ability to simplify complex concepts and inspire learners.",
      "Dedicated education specialist focused on student-centered learning and continuous improvement. Proficient in assessment strategies, educational technology, and creating inclusive learning environments.",
    ],
  };

  const getSummary = () => {
    if (!cvData?.careerTrack) return "";

    const track = cvData.careerTrack;
    return summaryDatabase[track][selectedSummary];
  };

  const handleDownloadFastPDF = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    let y = 40;

    const lineGap = 16;

    const addSectionTitle = (title) => {
      pdf.setFontSize(16);
      pdf.setTextColor("#048998");
      pdf.text(title, 40, y);
      y += 22;
    };

    const addText = (text, size = 12, color = "#000") => {
      pdf.setFontSize(size);
      pdf.setTextColor(color);

      const lines = pdf.splitTextToSize(text, 500);
      lines.forEach((line) => {
        if (y > 780) {
          pdf.addPage();
          y = 40;
        }
        pdf.text(line, 40, y);
        y += lineGap;
      });
      y += 10;
    };

    pdf.setFontSize(22);
    pdf.setTextColor("#000");
    pdf.text(userPro.fullName || "", 40, y);
    y += 24;

    pdf.setFontSize(12);
    pdf.setTextColor("#333");
    pdf.text(`Email: ${userPro.email}`, 40, y);
    y += 30;

    const summary = getSummary();
    if (summary) {
      addSectionTitle("Professional Summary");
      addText(summary);
    }

    addSectionTitle("Education");
    addText(userPro.education || "");
    addText(userPro.department || "");

    addSectionTitle("Work Experience");
    addText(userPro.job_experience || "");

    addSectionTitle("Skills");
    addText((userPro.skills || []).join(", "));

    if (projects.length > 0) {
      addSectionTitle("Projects");

      projects.forEach((p, i) => {
        pdf.setFontSize(14);
        pdf.setTextColor("#065f46");
        pdf.text(`${p.title}`, 40, y);
        y += 18;

        addText(p.description, 12, "#333");

        if (p.liveLink) addText(`Live: ${p.liveLink}`, 11, "#0000ee");
        if (p.githubLink) addText(`GitHub: ${p.githubLink}`, 11, "#0000ee");

        y += 10;
      });
    }

    pdf.setFontSize(10);
    pdf.setTextColor("#666");
    pdf.text("Generated by CareerVista CV Assistant", 40, 820);

    pdf.save("my_cv.pdf");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 print:hidden">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            CV Profile Assistant
          </h1>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold">Career Track</label>
              {/* <select
                value={userPro?.careerTrack}
                onChange={(e) => setUserData({...userPro, careerTrack: e.target.value})}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
               <option value="Web Development">Web Development</option>
                <option value="Mobile App Development">Mobile App Development</option>
                <option value="Data Science">Data Science</option>
                <option value="AI / ML">AI / ML</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Content Writing">Content Writing</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Business Analysis">Business Analysis</option>
                <option value="DevOps / System Administration">DevOps / System Administration</option>
                <option value="Finance & Accounting">Finance & Accounting</option>
                <option value="Human Resources (HR)">Human Resources (HR)</option>
                <option value="Education & Training">Education & Training</option>
              </select> */}
              <select
                value={cvData?.careerTrack || ""}
                onChange={(e) =>
                  setCvData((prev) => ({
                    ...prev,
                    careerTrack: e.target.value,
                  }))
                }
                className="w-full mt-1 px-4 py-2 border rounded-lg"
              >
                {Object.keys(summaryDatabase).map((track) => (
                  <option key={track} value={track}>
                    {track}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold">Summary Variation</label>
              <select
                value={selectedSummary}
                onChange={(e) => setSelectedSummary(parseInt(e.target.value))}
                className="w-full mt-1 px-4 py-2 border rounded-lg"
              >
                <option value={0}>Summary Option 1</option>
                <option value={1}>Summary Option 2</option>
                <option value={2}>Summary Option 3</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleDownloadFastPDF}
            className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-2"
          >
            <Download size={20} />
            Download CV as PDF
          </button>
        </div>

        <div
          id="cv-preview"
          ref={cvRef}
          className="bg-white shadow-xl rounded-lg p-10"
          style={{
            width: "210mm",
            minHeight: "297mm",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            color: "#000000",
          }}
        >
          <div className="border-b pb-4 mb-6">
            <h1 className="text-3xl font-bold text-slate-900">
              {userPro?.fullName}
            </h1>

            <div className="flex gap-4 mt-2 text-slate-700 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                {userPro?.email}
              </div>
            </div>
          </div>

          {getSummary() && (
            <section className="mb-6">
              <h2 className="text-xl font-bold border-b pb-1 mb-2">
                Professional Summary
              </h2>
              <p className="text-slate-700 leading-relaxed">{getSummary()}</p>
            </section>
          )}

          <section className="mb-6">
            <h2 className="text-xl font-bold border-b pb-1 mb-2">Education</h2>
            <p className="font-semibold">{userPro?.education}</p>
            <p className="text-slate-700">{userPro?.department}</p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold border-b pb-1 mb-2">
              Work Experience
            </h2>
            <p className="text-slate-700">{userPro?.job_experience}</p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold border-b pb-1 mb-2">Skills</h2>
            <p className="text-slate-700">{userPro?.skills?.join(", ")}</p>
          </section>

          {projects.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold border-b pb-1 mb-2">Projects</h2>
              {projects.map((p, idx) => (
                <div key={idx} className="mb-4">
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <p className="text-slate-700">{p.description}</p>

                  {p.liveLink && (
                    <p className="text-blue-700 text-sm">Live: {p.liveLink}</p>
                  )}
                  {p.githubLink && (
                    <p className="text-blue-700 text-sm">
                      GitHub: {p.githubLink}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVAssistant;
