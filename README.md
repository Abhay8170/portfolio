# Abhay Sharma — Portfolio (Multi-page)

Futuristic multi-page portfolio with resume download, contact form, project filters, and dark/light theme.

## Folder structure

```
abhay-portfolio/
├── index.html              # Home
├── about.html
├── projects.html           # With category filters
├── experience.html
├── certifications.html
├── contact.html            # Form + links + resume download
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   │   └── profile.jpg
│   ├── resume/
│   │   └── Abhay_Sharma_Resume.pdf
│   └── icons/
└── README.md
```

## Features

- Multi-page navigation (Home, About, Projects, Experience, Certifications, Contact)
- Resume PDF download (navbar + buttons)
- Contact form (Web3Forms — free; add your access key)
- Project filters (All / AI / Frontend / Java)
- Dark / light theme toggle (saved in localStorage)
- Profile photo, particle background, futuristic UI
- SEO meta tags + Open Graph basics
- Fully responsive

## Preview locally

```bash
cd abhay-portfolio
python -m http.server 8080
# open http://localhost:8080
```

## Enable real contact emails

1. Go to https://web3forms.com and create a free access key (uses your email).
2. Open `contact.html`.
3. Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your key.
4. Redeploy — form messages will arrive in your inbox.

## Deploy (public link)

### GitHub Pages
1. Push this folder to a repo  
2. Settings → Pages → Deploy from `main` (root)  
3. Site at `https://Abhay8170.github.io` or `https://Abhay8170.github.io/repo-name`

## Share on LinkedIn

> Excited to share my personal portfolio 🚀  
> Multi-page site with projects (including the RAG Chatbot from my Yatra internship), experience, certifications, and a downloadable resume.  
>  
> 🔗 Live: [YOUR_URL]  
> 📂 GitHub: https://github.com/Abhay8170  
>  
> #OpenToWork #GenerativeAI #FullStack #RAG #StudentDeveloper

Also add the URL under **Featured** and **Contact info → Websites** on your LinkedIn profile.
