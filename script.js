// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Modal functionality
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Close buttons
document.addEventListener('DOMContentLoaded', function() {
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
});

// Skills modal
function showSkills() {
    openModal('skills-modal');
}

// Resume toggle
function toggleResume() {
    const container = document.getElementById('resume-container');
    const btnText = document.getElementById('resume-btn-text');
    
    if (container.style.display === 'none') {
        container.style.display = 'block';
        btnText.textContent = 'Hide Resume';
    } else {
        container.style.display = 'none';
        btnText.textContent = 'View Resume';
    }
}

// Project details
function showProjectDetails(projectId) {
    const projectData = {
        'rag': {
            title: 'Retrieval-Augmented Generation (Nokia Internship)',
            description: 'Developed a comprehensive RAG pipeline during my internship at Nokia. This system combines the power of large language models with efficient document retrieval using Elasticsearch.',
            features: [
                'Implemented semantic search using vector embeddings',
                'Built question-answering system with context retrieval',
                'Optimized for enterprise-scale document processing',
                'Integrated with LangChain for prompt engineering'
            ],
            technologies: ['Python', 'LangChain', 'Elasticsearch', 'Transformers', 'FAISS']
        },
        'image-seg': {
            title: 'Image Classification and Segmentation',
            description: 'Developed a computer vision system for agricultural applications, focusing on plant health assessment through leaf analysis.',
            features: [
                'CNN architecture for binary classification',
                'DeepLabV3 with ResNet50 backbone for segmentation',
                'Data augmentation techniques for robust training',
                'Real-time inference pipeline'
            ],
            technologies: ['PyTorch', 'OpenCV', 'PIL', 'Matplotlib', 'NumPy']
        },
        'transliteration': {
            title: 'Seq2Seq Transliteration System',
            description: 'Built an attention-based sequence-to-sequence model for Hindi to English name transliteration, addressing the challenge of cross-script language processing.',
            features: [
                'Encoder-decoder architecture with attention mechanism',
                'Character-level tokenization for both scripts',
                'Beam search for improved output quality',
                'Evaluation using BLEU and edit distance metrics'
            ],
            technologies: ['TensorFlow', 'Keras', 'NLTK', 'Pandas', 'Matplotlib']
        },
        'pagerank': {
            title: 'PageRank Algorithm Implementation',
            description: 'Implemented Google\'s PageRank algorithm using the power iteration method, demonstrating graph-based ranking systems.',
            features: [
                'Power iteration method for eigenvalue computation',
                'Sparse matrix optimization for large graphs',
                'Damping factor analysis and tuning',
                'Visualization of ranking convergence'
            ],
            technologies: ['Python', 'NumPy', 'SciPy', 'NetworkX', 'Matplotlib']
        },
        'clustering': {
            title: 'K-Means & GMM Clustering on MNIST',
            description: 'Applied unsupervised learning techniques to the MNIST dataset, comparing K-Means and Gaussian Mixture Models for digit classification.',
            features: [
                'K-Means clustering with different initialization strategies',
                'Gaussian Mixture Models with EM algorithm',
                'Dimensionality reduction using PCA and t-SNE',
                'Cluster evaluation using silhouette score and ARI'
            ],
            technologies: ['Scikit-learn', 'NumPy', 'Matplotlib', 'Seaborn', 'Pandas']
        }
    };

    const project = projectData[projectId];
    const detailsHtml = `
        <h2>${project.title}</h2>
        <p style="margin: 1rem 0; font-size: 1.1rem;">${project.description}</p>
        
        <h3>Key Features:</h3>
        <ul style="margin: 1rem 0;">
            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        
        <h3>Technologies Used:</h3>
        <div style="margin: 1rem 0;">
            ${project.technologies.map(tech => 
                `<span style="background: #667eea; color: white; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.9rem; margin: 0.2rem;">${tech}</span>`
            ).join('')}
        </div>
    `;
    
    document.getElementById('project-details').innerHTML = detailsHtml;
    openModal('project-modal');
}

// Generate new plots
async function generateNewPlots() {
    const btn = document.getElementById('generate-btn-text');
    const originalText = btn.textContent;
    
    // Show loading state
    btn.innerHTML = '<span class="loading"></span> Generating...';
    
    try {
        // Simulate API call to Python script
        await fetch('/generate-plots', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        // Refresh images with cache busting
        const timestamp = new Date().getTime();
        const images = document.querySelectorAll('.viz-item img');
        images.forEach((img, index) => {
            img.src = `plots/plot${index + 1}.png?t=${timestamp}`;
        });
        
        btn.textContent = 'Plots Generated!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
        
    } catch (error) {
        console.error('Error generating plots:', error);
        btn.textContent = 'Error - Try Again';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }
}

// Image modal for visualizations
function openImageModal(img) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    
    modalImg.src = img.src;
    modalTitle.textContent = img.alt;
    openModal('image-modal');
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add typing animation to name
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize animations on page load
window.addEventListener('load', function() {
    const nameTitle = document.getElementById('name-title');
    if (nameTitle) {
        const originalText = nameTitle.textContent;
        typeWriter(nameTitle, originalText, 150);
    }
});