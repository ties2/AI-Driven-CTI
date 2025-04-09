import { CTIEvent } from '../types/cti';

export const mockCTIData: CTIEvent[] = [
  {
    id: 1,
    threatType: "phishing",
    sourceIP: "192.168.1.10",
    timestamp: "2025-04-01",
    severity: 8,
    description: "Suspicious email link containing malicious payload"
  },
  {
    id: 2,
    threatType: "malware",
    sourceIP: "10.0.0.5",
    timestamp: "2025-04-02",
    severity: 6,
    description: "Trojan detected in system files"
  },
  {
    id: 3,
    threatType: "phishing",
    sourceIP: "172.16.0.3",
    timestamp: "2025-04-03",
    severity: 9,
    description: "Sophisticated fake login page targeting employees"
  },
  {
    id: 4,
    threatType: "recon",
    sourceIP: "203.0.113.7",
    timestamp: "2025-04-04",
    severity: 4,
    description: "Port scanning activity detected"
  },
  {
    id: 5,
    threatType: "malware",
    sourceIP: "198.51.100.2",
    timestamp: "2025-04-05",
    severity: 7,
    description: "Ransomware attempt blocked"
  }
];