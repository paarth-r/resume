import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { resume } from "@/data/resume";

const INK = "#14140f";
const GREY = "#555048";
const FAINT = "#8a8478";
const LINE = "#d8d4c8";
const ACCENT = "#a8431d";

const s = StyleSheet.create({
  page: {
    paddingTop: 38,
    paddingBottom: 34,
    paddingHorizontal: 44,
    fontFamily: "Helvetica",
    fontSize: 9.2,
    color: INK,
    lineHeight: 1.42,
  },
  name: { fontFamily: "Helvetica-Bold", fontSize: 22, letterSpacing: -0.4 },
  role: { fontSize: 9.5, color: ACCENT, marginTop: 3, letterSpacing: 0.3 },
  contact: { fontSize: 8.4, color: GREY, marginTop: 6 },
  contactLink: { color: GREY, textDecoration: "none" },
  rule: { borderBottomWidth: 1, borderBottomColor: LINE, marginVertical: 12 },
  summary: { fontSize: 9.2, color: GREY, marginBottom: 4 },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    letterSpacing: 1.4,
    color: FAINT,
    textTransform: "uppercase",
    marginBottom: 7,
  },
  block: { marginBottom: 13 },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  org: { fontFamily: "Helvetica-Bold", fontSize: 10 },
  meta: { fontSize: 8.4, color: FAINT },
  roleLine: { fontSize: 9, color: ACCENT, marginBottom: 3 },
  itemSummary: { fontSize: 8.8, color: GREY, marginBottom: 3 },
  bulletRow: { flexDirection: "row", marginBottom: 2, paddingRight: 6 },
  bulletDot: { color: ACCENT, marginRight: 6 },
  bulletText: { flex: 1, fontSize: 8.8 },
  entry: { marginBottom: 8 },
  projName: { fontFamily: "Helvetica-Bold", fontSize: 9.4 },
  projBlurb: { fontSize: 8.8, color: GREY, marginTop: 1 },
  tags: { fontSize: 7.8, color: FAINT, marginTop: 2 },
  skillRow: { flexDirection: "row", marginBottom: 3 },
  skillGroup: { width: 92, fontFamily: "Helvetica-Bold", fontSize: 8.6 },
  skillItems: { flex: 1, fontSize: 8.8, color: GREY },
  awardRow: { flexDirection: "row", marginBottom: 2 },
});

const strip = (u: string) => u.replace(/^https?:\/\//, "").replace(/\/$/, "");

export function ResumeDoc() {
  const { profile, links, experience, projects, skills, education, awards } =
    resume;

  return (
    <Document
      title={`${profile.name} — Resume`}
      author={profile.name}
      subject={profile.role}
    >
      <Page size="A4" style={s.page}>
        {/* Header */}
        <Text style={s.name}>{profile.name}</Text>
        <Text style={s.role}>{profile.role}</Text>
        <Text style={s.contact}>
          <Link style={s.contactLink} src={`mailto:${links.email}`}>
            {links.email}
          </Link>
          {"   ·   "}
          {links.phone}
          {"   ·   "}
          {profile.location}
        </Text>
        <Text style={s.contact}>
          <Link style={s.contactLink} src={links.github}>
            {strip(links.github)}
          </Link>
          {"   ·   "}
          <Link style={s.contactLink} src={links.linkedin}>
            linkedin.com/in/paarth-rajpal
          </Link>
          {"   ·   "}
          <Link style={s.contactLink} src={links.site}>
            {strip(links.site)}
          </Link>
        </Text>

        <View style={s.rule} />
        <Text style={s.summary}>{profile.about}</Text>

        {/* Experience */}
        <View style={[s.block, { marginTop: 6 }]}>
          <Text style={s.sectionTitle}>Experience</Text>
          {experience.map((e) => (
            <View key={e.org} style={s.entry} wrap={false}>
              <View style={s.itemHeader}>
                <Text style={s.org}>{e.org}</Text>
                <Text style={s.meta}>
                  {e.period}  ·  {e.location}
                </Text>
              </View>
              <Text style={s.roleLine}>{e.role}</Text>
              <Text style={s.itemSummary}>{e.summary}</Text>
              {e.points.map((p, i) => (
                <View key={i} style={s.bulletRow}>
                  <Text style={s.bulletDot}>—</Text>
                  <Text style={s.bulletText}>{p}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Projects */}
        <View style={s.block}>
          <Text style={s.sectionTitle}>Selected Projects</Text>
          {projects.map((p) => (
            <View key={p.name} style={s.entry} wrap={false}>
              <Text style={s.projName}>{p.name}</Text>
              <Text style={s.projBlurb}>{p.blurb}</Text>
              <Text style={s.tags}>{p.tags.join("  ·  ")}</Text>
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={s.block}>
          <Text style={s.sectionTitle}>Skills</Text>
          {skills.map((g) => (
            <View key={g.group} style={s.skillRow}>
              <Text style={s.skillGroup}>{g.group}</Text>
              <Text style={s.skillItems}>{g.items.join(", ")}</Text>
            </View>
          ))}
        </View>

        {/* Education */}
        <View style={s.block}>
          <Text style={s.sectionTitle}>Education</Text>
          <View style={s.itemHeader}>
            <Text style={s.org}>{education.school}</Text>
            <Text style={s.meta}>
              {education.detail}  ·  {education.location}
            </Text>
          </View>
          <Text style={s.itemSummary}>{education.involvement.join("  ·  ")}</Text>
        </View>

        {/* Awards */}
        <View style={s.block}>
          <Text style={s.sectionTitle}>Honors</Text>
          {awards.map((a, i) => (
            <View key={i} style={s.awardRow}>
              <Text style={s.bulletDot}>—</Text>
              <Text style={s.bulletText}>{a}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
