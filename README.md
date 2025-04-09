# CTI Risk Analyzer

![Risk Chart](AI-CTI.jpg)

**A Python-based tool leveraging Cyber Threat Intelligence (CTI) and AI to assess and visualize hacking risks for customers.**

## Overview

The CTI Risk Analyzer processes commercial CTI feeds to identify cybersecurity threats (e.g., phishing, malware) and generates customer-friendly reports. By combining real-time threat intelligence with machine learning, it empowers users to understand their hacking risks and take proactive measures.

This project serves as a proof-of-concept for bridging CTI expertise with AI-driven insights, leveraging unique commercial feeds to deliver actionable value.

## Features

- **CTI Parsing**: Extracts key indicators like threat type and severity from structured data (e.g., JSON feeds).
- **AI Analysis**: Uses a Random Forest Classifier to predict high-risk threats based on patterns.
- **Customer Reports**: Produces concise text summaries and visualizations of hacking risks.
- **Extensible**: Designed to integrate with live feeds and scale with advanced AI techniques.

## Installation

### Prerequisites
- Python 3.8+


### Setup
1. **Clone the Repository**:
```bash
git clone https://github.com/yourusername/cti-risk-analyzer.git
cd cti-risk-analyzer

###Sample
```bash
Loaded CTI Data:
    id threat_type     source_ip   timestamp  severity            description
0   1    phishing  192.168.1.10  2025-04-01         8  Suspicious email link
1   2     malware      10.0.0.5  2025-04-02         6        Trojan detected
2   3    phishing    172.16.0.3  2025-04-03         9        Fake login page
3   4       recon   203.0.113.7  2025-04-04         4          Port scanning
4   5     malware  198.51.100.2  2025-04-05         7     Ransomware attempt
Model Accuracy: 0.00

=== Customer Hacking Risk Report ===
Based on recent threat intelligence, here are your potential risks:
- malware: HIGH risk (Avg Severity: 6.5/10)
- phishing: HIGH risk (Avg Severity: 8.5/10)
- recon: LOW risk (Avg Severity: 4.0/10)
```
