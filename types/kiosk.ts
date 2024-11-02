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
  footerText: string;
  sections: KioskSection[];
  // ... other fields as required
} 