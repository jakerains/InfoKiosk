export interface KioskSection {
  title: string;
  content: string[];
}

export interface KioskConfig {
  id: string;
  name: string;
  headerTitle: string;
  headerSubtitle: string;
  backgroundWords: string[];
  mainTitle: string;
  mainDescription: string;
  showPoweredBy: boolean;
  footerText: string;
  mainIcon: string;
  infoBox1: {
    title: string;
    content: string[];
  };
  infoBox2: {
    title: string;
    content: string[];
  };
  sections: KioskSection[];
} 