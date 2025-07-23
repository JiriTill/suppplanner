# SuppPlan.com

**Personalized supplement schedules & guidance for better health.**

SuppPlan is a smart web application that helps people organize their daily supplements, avoid harmful combinations, get personalized recommendations based on their goals or lab results, and understand what they're taking through a searchable vitamin/supplement library.

## Features (MVP)

* **Personalized Planner:**
    * **Create New Plan:** Users input health goals, medical issues, and can optionally upload medical reports/blood work. Outputs recommended supplements, weekly schedules, and doses.
    * **Revise Current Plan:** Users input current supplements, health goals, and can optionally upload reports. Outputs a revised weekly plan with recommendations for additions/removals and doses.
* **Supplement Library:** A comprehensive, searchable database of vitamins and supplements with detailed information (what it is, benefits, deficiency signs, natural sources, forms, safe dosage, timing).
* **Blog:** Articles on supplement timing, stacks, nutrition tips, and common mistakes.
* **Anonymous Data Collection:** Gathers non-personal, aggregated data on user inputs (e.g., common health goals, frequently mentioned issues, popular supplements) to improve services and understand user needs.
* **Terms of Service:** Clearly outlines data usage and disclaimers.

## Technology Stack

* **Frontend:** React.js
* **Styling:** Tailwind CSS
* **Hosting:** Vercel
* **Version Control:** GitHub
* **AI/LLM:** Gemini API (for personalized recommendations)
* **Database (Anonymous Data):** Google Firestore

## Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/suppplan-app.git](https://github.com/your-username/suppplan-app.git)
cd suppplan-app
