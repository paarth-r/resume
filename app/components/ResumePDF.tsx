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
    paddingTop: 24,
    paddingBottom: 20,
    paddingHorizontal: 42,
    fontFamily: "Helvetica",
    fontSize: 8.8,
    color: INK,
    lineHeight: 1.26,
  },
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 20,
    letterSpacing: -0.4,
    lineHeight: 1.1,
    marginBottom: 4,
  },
  role: { fontSize: 9.1, color: ACCENT, marginTop: 0, letterSpacing: 0.3 },
  contact: { fontSize: 8.2, color: GREY, marginTop: 4 },
  contactLink: { color: GREY, textDecoration: "none" },
  rule: { borderBottomWidth: 1, borderBottomColor: LINE, marginVertical: 7 },
  summary: { fontSize: 9, color: GREY, marginBottom: 3 },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.4,
    letterSpacing: 1.4,
    color: FAINT,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  block: { marginBottom: 7 },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  org: { fontFamily: "Helvetica-Bold", fontSize: 9.8 },
  meta: { fontSize: 8.3, color: FAINT },
  roleLine: { fontSize: 8.9, color: ACCENT, marginBottom: 2 },
  itemSummary: { fontSize: 8.7, color: GREY, marginBottom: 2 },
  bulletRow: { flexDirection: "row", marginBottom: 1.5, paddingRight: 6 },
  bulletDot: { color: ACCENT, marginRight: 6 },
  bulletText: { flex: 1, fontSize: 8.7 },
  entry: { marginBottom: 5 },
  projEntry: { marginBottom: 3 },
  projName: { fontFamily: "Helvetica-Bold", fontSize: 8.9, color: INK },
  projBlurb: { fontSize: 8.7, color: GREY },
  skillRow: { flexDirection: "row", marginBottom: 2 },
  skillGroup: { width: 92, fontFamily: "Helvetica-Bold", fontSize: 8.5 },
  skillItems: { flex: 1, fontSize: 8.7, color: GREY },
  awardRow: { flexDirection: "row", marginBottom: 1.5 },
});

const strip = (u: string) => u.replace(/^https?:\/\//, "").replace(/\/$/, "");

export function ResumeDoc() {
  const { profile, links, experience, projects, skills, awards } = resume;

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
            <View key={p.name} style={s.projEntry} wrap={false}>
              <Text style={s.projBlurb}>
                <Text style={s.projName}>{p.name}</Text>
                {"  —  "}
                {p.blurb}
              </Text>
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

        {/* Awards */}
        <View style={s.block} wrap={false}>
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
