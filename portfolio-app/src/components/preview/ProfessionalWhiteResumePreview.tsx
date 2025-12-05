"use client";

import { ResumeData, TemplateMeta } from "@/types/forms";

type ProfessionalWhiteResumePreviewProps = {
  data: ResumeData;
  template: TemplateMeta;
};

export const ProfessionalWhiteResumePreview = ({ data, template }: ProfessionalWhiteResumePreviewProps) => {
  return (
    <div 
      style={{ 
        width: '100%', 
        backgroundColor: '#ffffff', 
        padding: '2rem', 
        color: '#1e293b',
        fontFamily: 'Arial, Helvetica, sans-serif',
        maxWidth: '100%',
        margin: '0 auto'
      }}
    >
      {/* Header */}
      <header style={{ borderBottom: '1px solid #cbd5e1', paddingBottom: '1rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#0f172a' }}>{data.personal.fullName}</h1>
          <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#2563eb', marginTop: '0.25rem' }}>{data.personal.headline}</p>
          <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.875rem', color: '#64748b' }}>
            <span>{data.personal.email}</span>
            <span>|</span>
            <span>{data.personal.phone}</span>
            <span>|</span>
            <span>{data.personal.location}</span>
          </div>
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section style={{ marginTop: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.25rem' }}>PROFESSIONAL SUMMARY</h2>
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#334155' }}>{data.summary}</p>
        </section>
      )}

      <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
        {/* Left Column - Skills, Education, Certifications */}
        <div style={{ spaceY: '1.5rem' }}>
          {/* Skills */}
          <section>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.25rem' }}>SKILLS</h2>
            <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {data.skills.map((skill, index) => (
                <span key={index} style={{ display: 'inline-block', backgroundColor: '#dbeafe', color: '#2563eb', fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.25rem' }}>EDUCATION</h2>
            <div style={{ marginTop: '0.5rem', spaceY: '0.75rem' }}>
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0f172a' }}>{edu.degree}</p>
                  <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{edu.school}</p>
                  <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {edu.startDate} - {edu.endDate}
                  </p>
                  {edu.details && (
                    <p style={{ fontSize: '0.75rem', color: '#334155', marginTop: '0.25rem' }}>{edu.details}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <section>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.25rem' }}>CERTIFICATIONS</h2>
              <ul style={{ marginTop: '0.5rem', spaceY: '0.25rem' }}>
                {data.certifications.map((cert) => (
                  <li key={cert.id} style={{ fontSize: '0.875rem', color: '#334155' }}>
                    <span style={{ fontWeight: '600' }}>{cert.name}</span> - {cert.issuer} ({cert.year})
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <section>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.25rem' }}>LANGUAGES</h2>
              <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#334155' }}>{data.languages.join(", ")}</p>
            </section>
          )}
        </div>

        {/* Right Column - Experience */}
        <div>
          <section>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#0f172a', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.25rem' }}>PROFESSIONAL EXPERIENCE</h2>
            <div style={{ marginTop: '0.5rem', spaceY: '1rem' }}>
              {data.experiences.map((experience) => (
                <div key={experience.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#0f172a' }}>{experience.role}</p>
                    <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                      {experience.startDate} - {experience.endDate}
                    </p>
                  </div>
                  <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#2563eb' }}>{experience.company}</p>
                  <ul style={{ marginTop: '0.25rem', spaceY: '0.25rem' }}>
                    {experience.description.split('\n').map((line, index) => (
                      <li key={index} style={{ fontSize: '0.875rem', color: '#334155', display: 'flex' }}>
                        <span style={{ marginRight: '0.5rem' }}>•</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};