import React, { useState, useRef, useEffect } from "react";
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
} from "lucide-react";
import useAuth from "../../customHooks/useAuth";
import useAxiosSecure from "../../customHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import jsPDF from "jspdf";
import { FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa";

const CVAssistant = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const cvRef = useRef(null);
  const [selectedSummary, setSelectedSummary] = useState(0);
  const [cvData, setCvData] = useState(null);

  const { isPending, data: userPro = {} } = useQuery({
    queryKey: ["userPro", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/user/${user?.email}`);
      return res.data;
    },
  });

  const safeJsonParse = (data, fallback = []) => {
    if (!data) return fallback;
    if (Array.isArray(data)) return data;
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      return fallback;
    }
  };

  useEffect(() => {
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

  const skills = safeJsonParse(cvData?.skills || userPro?.skills, []);
  const projects = safeJsonParse(cvData?.projects || userPro?.projects, []);
  const cocurricular = safeJsonParse(
    cvData?.cocurricular_activities || userPro?.cocurricular_activities,
    []
  );

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
    return summaryDatabase[track]?.[selectedSummary] || "";
  };

  const handleDownloadFastPDF = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    let y = 40;
    const lineGap = 14;
    const pageWidth = 595;
    const margin = 60;
    const contentWidth = pageWidth - margin * 2;

    const checkPageBreak = (spaceNeeded = 50) => {
      if (y + spaceNeeded > 770) {
        pdf.addPage();
        y = 40;
      }
    };

    const addSectionTitle = (title) => {
      checkPageBreak(30);
      y += 6;

      pdf.setFontSize(13);
      pdf.setFont(undefined, "bold");
      pdf.setTextColor("#1e293b");
      pdf.text(title, margin, y);

      pdf.setLineWidth(1.5);
      pdf.setDrawColor("#cbd5e1");
      pdf.line(margin, y + 4, pageWidth - margin, y + 4);

      y += 18;
    };

    const addText = (text, size = 10, isBold = false, color = "#334155") => {
      if (!text) return;

      pdf.setFontSize(size);
      pdf.setFont(undefined, isBold ? "bold" : "normal");
      pdf.setTextColor(color);

      const lines = pdf.splitTextToSize(text, contentWidth);
      lines.forEach((line) => {
        checkPageBreak();
        pdf.text(line, margin, y);
        y += lineGap;
      });
    };

    pdf.setFontSize(24);
    pdf.setFont(undefined, "bold");
    pdf.setTextColor("#0f172a");
    pdf.text(cvData?.fullName || userPro?.fullName || "", margin, y);
    y += 20;

    pdf.setFontSize(9);
    pdf.setFont(undefined, "normal");
    pdf.setTextColor("#475569");

    const contactLine = [];
    if (cvData?.email || userPro?.email) {
      contactLine.push(` ${cvData?.email || userPro?.email}`);
    }
    if (cvData?.contact || userPro?.contact) {
      contactLine.push(` ${cvData?.contact || userPro?.contact}`);
    }

    if (contactLine.length > 0) {
      pdf.text(contactLine.join("  |  "), margin, y);
      y += 13;
    }

    if (cvData?.address || userPro?.address) {
      const addressLines = pdf.splitTextToSize(
        ` ${cvData?.address || userPro?.address}`,
        contentWidth
      );
      addressLines.forEach((line) => {
        pdf.text(line, margin, y);
        y += 13;
      });
    }

    pdf.setFontSize(9);
    pdf.setTextColor("#2563eb");

    const firstSocialLine = [];
    if (cvData?.github_link || userPro?.github_link) {
      firstSocialLine.push(
        `GitHub: ${cvData?.github_link || userPro?.github_link}`
      );
    }
    if (cvData?.portfolio_link || userPro?.portfolio_link) {
      firstSocialLine.push(
        `Portfolio: ${cvData?.portfolio_link || userPro?.portfolio_link}`
      );
    }

    if (firstSocialLine.length > 0) {
      const socialText = firstSocialLine.join("  |  ");
      const socialWidth = pdf.getTextWidth(socialText);

      if (socialWidth < contentWidth) {
        pdf.text(socialText, margin, y);
        y += 13;
      } else {
        firstSocialLine.forEach((link) => {
          pdf.text(link, margin, y);
          y += 13;
        });
      }
    }

    if (cvData?.linkedin_link || userPro?.linkedin_link) {
      pdf.text(
        `LinkedIn: ${cvData?.linkedin_link || userPro?.linkedin_link}`,
        margin,
        y
      );
      y += 13;
    }

    y += 6;

    const summary = getSummary();
    if (summary) {
      addSectionTitle("Career Objective");
      addText(summary, 10, false, "#475569");
      y += 6;
    }

    addSectionTitle("Education");

    if (cvData?.education || userPro?.education) {
      addText(cvData?.education || userPro?.education, 10, true, "#0f172a");
    }
    if (cvData?.department || userPro?.department) {
      addText(cvData?.department || userPro?.department, 10, false, "#475569");
    }
    if (cvData?.educationalInstitute || userPro?.educationalInstitute) {
      addText(
        cvData?.educationalInstitute || userPro?.educationalInstitute,
        10,
        false,
        "#475569"
      );
    }
    if (cvData?.passing_year || userPro?.passing_year) {
      addText(
        `Passing Year: ${cvData?.passing_year || userPro?.passing_year}`,
        9,
        false,
        "#64748b"
      );
    }
    y += 6;

    if (cvData?.job_experience || userPro?.job_experience) {
      addSectionTitle("Work Experience");
      addText(
        cvData?.job_experience || userPro?.job_experience,
        10,
        false,
        "#475569"
      );
      y += 6;
    }

    if (skills.length > 0) {
      addSectionTitle("Skills");
      addText(skills.join(" • "), 10, false, "#475569");
      y += 6;
    }

    if (projects.length > 0) {
      addSectionTitle("Projects");

      projects.forEach((p, i) => {
        checkPageBreak(45);

        pdf.setFontSize(11);
        pdf.setFont(undefined, "bold");
        pdf.setTextColor("#0f172a");
        pdf.text(`${p.title}`, margin, y);
        y += 16;

        if (p.description) {
          pdf.setFontSize(10);
          pdf.setFont(undefined, "normal");
          pdf.setTextColor("#475569");
          const descLines = pdf.splitTextToSize(p.description, contentWidth);
          descLines.forEach((line) => {
            checkPageBreak();
            pdf.text(line, margin, y);
            y += lineGap;
          });
          y += 3;
        }

        pdf.setFontSize(9);
        pdf.setFont(undefined, "normal");
        pdf.setTextColor("#2563eb");

        if (p.liveLink) {
          checkPageBreak();
          pdf.text(`Live Demo: ${p.liveLink}`, margin, y);
          y += 12;
        }

        if (p.githubLink) {
          checkPageBreak();
          pdf.text(`GitHub: ${p.githubLink}`, margin, y);
          y += 12;
        }

        y += 8;
      });
    }

    if (cocurricular.length > 0) {
      addSectionTitle("Co-curricular Activities");
      cocurricular.forEach((activity, index) => {
        checkPageBreak();
        pdf.setFontSize(10);
        pdf.setFont(undefined, "normal");
        pdf.setTextColor("#475569");

        const bulletText = `• ${activity}`;
        const lines = pdf.splitTextToSize(bulletText, contentWidth - 10);
        lines.forEach((line, lineIndex) => {
          checkPageBreak();
          pdf.text(line, margin + (lineIndex > 0 ? 10 : 0), y);
          y += lineGap;
        });
      });
      y += 6;
    }

    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor("#64748b");
      pdf.setFont(undefined, "normal");

      const footerText = "Generated by CareerVista CV Assistant";
      const footerWidth = pdf.getTextWidth(footerText);
      pdf.text(footerText, (pageWidth - footerWidth) / 2, 820);
    }

    pdf.save(`${cvData?.fullName || userPro?.fullName || "CV"}_Resume.pdf`);
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
              <label className="text-sm font-semibold block mb-1">
                Career Track
              </label>
              <select
                value={cvData?.careerTrack || ""}
                onChange={(e) =>
                  setCvData((prev) => ({
                    ...prev,
                    careerTrack: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.keys(summaryDatabase).map((track) => (
                  <option key={track} value={track}>
                    {track}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold block mb-1">
                Summary Variation
              </label>
              <select
                value={selectedSummary}
                onChange={(e) => setSelectedSummary(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={0}>Summary Option 1</option>
                <option value={1}>Summary Option 2</option>
                <option value={2}>Summary Option 3</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleDownloadFastPDF}
            className="mt-6 px-6 py-3 bg-[#048998] hover:bg-[#3bb4c1] text-white font-semibold rounded-lg flex items-center gap-2 transition-colors"
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
          <div className="border-b-2 border-slate-300 pb-4 mb-3">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              {cvData?.fullName || userPro?.fullName}
            </h1>

            <div className="flex flex-wrap gap-2 text-slate-700 text-sm">
              {(cvData?.email || userPro?.email) && (
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  {cvData?.email || userPro?.email}
                </div>
              )}

              {(cvData?.contact || userPro?.contact) && (
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  {cvData?.contact || userPro?.contact}
                </div>
              )}

              {(cvData?.address || userPro?.address) && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span className="text-xs">
                    {cvData?.address || userPro?.address}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 mt-2 text-sm">
              {(cvData?.github_link || userPro?.github_link) && (
                <a
                  href={cvData?.github_link || userPro?.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <FaGithub size={16} />
                  GitHub
                </a>
              )}

              {(cvData?.linkedin_link || userPro?.linkedin_link) && (
                <a
                  href={cvData?.linkedin_link || userPro?.linkedin_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <FaLinkedin size={16} />
                  LinkedIn
                </a>
              )}

              {(cvData?.portfolio_link || userPro?.portfolio_link) && (
                <a
                  href={cvData?.portfolio_link || userPro?.portfolio_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <FaGlobe size={16} />
                  Portfolio
                </a>
              )}
            </div>
          </div>

          {getSummary() && (
            <section className="mb-3">
              <h2 className="text-xl font-bold border-b-2 border-slate-300 pb-1 mb-2 text-slate-800">
                Career Objective
              </h2>
              <p className="text-slate-700 leading-relaxed text-justify">
                {getSummary()}
              </p>
            </section>
          )}

          <section className="mb-3">
            <h2 className="text-xl font-bold border-b-2 border-slate-300 pb-1 mb-2 text-slate-800">
              Education
            </h2>
            <div className="space-y-1">
              {(cvData?.education || userPro?.education) && (
                <p className="font-semibold text-slate-900">
                  {cvData?.education || userPro?.education}
                </p>
              )}
              {(cvData?.department || userPro?.department) && (
                <p className="text-slate-700">
                  {cvData?.department || userPro?.department}
                </p>
              )}
              {(cvData?.educationalInstitute ||
                userPro?.educationalInstitute) && (
                <p className="text-slate-700">
                  {cvData?.educationalInstitute ||
                    userPro?.educationalInstitute}
                </p>
              )}
              {(cvData?.passing_year || userPro?.passing_year) && (
                <p className="text-slate-600 text-sm">
                  Passing Year: {cvData?.passing_year || userPro?.passing_year}
                </p>
              )}
            </div>
          </section>

          {(cvData?.job_experience || userPro?.job_experience) && (
            <section className="mb-3">
              <h2 className="text-xl font-bold border-b-2 border-slate-300 pb-1 mb-2 text-slate-800">
                Work Experience
              </h2>
              <p className="text-slate-700 leading-relaxed">
                {cvData?.job_experience || userPro?.job_experience}
              </p>
            </section>
          )}

          {skills.length > 0 && (
            <section className="mb-3">
              <h2 className="text-xl font-bold border-b-2 border-slate-300 pb-1 mb-2 text-slate-800">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-200 text-slate-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section className="mb-2">
              <h2 className="text-xl font-bold border-b-2 border-slate-300 pb-1 mb-3 text-slate-800">
                Projects
              </h2>
              {projects.map((p, idx) => (
                <div key={idx} className="mb-2 last:mb-0">
                  <h3 className="font-semibold text-lg text-slate-900">
                    {p.title}
                  </h3>
                  {p.description && (
                    <p className="text-slate-700 mt-1 leading-relaxed text-justify">
                      {p.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-3 mt-1">
                    {p.liveLink && (
                      <a
                        href={p.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm hover:underline"
                      >
                        Live Demo: {p.liveLink}
                      </a>
                    )}
                    {p.githubLink && (
                      <a
                        href={p.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm hover:underline"
                      >
                        GitHub: {p.githubLink}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}

          {cocurricular.length > 0 && (
            <section className="mb-2">
              <h2 className="text-xl font-bold border-b-2 border-slate-300 pb-1 mb-1 text-slate-800">
                Co-curricular Activities
              </h2>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                {cocurricular.map((activity, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {activity}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVAssistant;
