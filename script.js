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

// Resume toggle with animation
function toggleResume() {
    const container = document.getElementById('resume-container');
    const btnText = document.getElementById('resume-btn-text');
    const icon = btnText.previousElementSibling;
    
    if (container.style.display === 'none' || container.style.display === '') {
        container.style.display = 'block';
        container.style.animation = 'slideDown 0.3s ease-out';
        btnText.textContent = 'Hide Resume';
        icon.className = 'fas fa-eye-slash';
    } else {
        container.style.animation = 'slideUp 0.3s ease-in';
        setTimeout(() => {
            container.style.display = 'none';
        }, 300);
        btnText.textContent = 'View Resume';
        icon.className = 'fas fa-eye';
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
            technologies: ['Python', 'LangChain', 'Elasticsearch', 'Transformers', 'FAISS'],
            github: '#',
            demo: '#'
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
            technologies: ['PyTorch', 'OpenCV', 'PIL', 'Matplotlib', 'NumPy'],
            github: '#',
            demo: '#'
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
            technologies: ['TensorFlow', 'Keras', 'NLTK', 'Pandas', 'Matplotlib'],
            github: '#',
            demo: '#'
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
            technologies: ['Python', 'NumPy', 'SciPy', 'NetworkX', 'Matplotlib'],
            github: '#',
            demo: '#'
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
            technologies: ['Scikit-learn', 'NumPy', 'Matplotlib', 'Seaborn', 'Pandas'],
            github: '#',
            demo: '#'
        }
    };

    const project = projectData[projectId];
    const detailsHtml = `
        <h2>${project.title}</h2>
        <p style="margin: 1rem 0; font-size: 1.1rem; line-height: 1.6;">${project.description}</p>
        
        <h3><i class="fas fa-star"></i> Key Features:</h3>
        <ul style="margin: 1rem 0; padding-left: 1.5rem;">
            ${project.features.map(feature => `<li style="margin: 0.5rem 0;">${feature}</li>`).join('')}
        </ul>
        
        <h3><i class="fas fa-tools"></i> Technologies Used:</h3>
        <div style="margin: 1rem 0;">
            ${project.technologies.map(tech => 
                `<span style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.9rem; margin: 0.3rem; display: inline-block; box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);">${tech}</span>`
            ).join('')}
        </div>
        
        <div style="margin-top: 2rem; text-align: center;">
            <a href="${project.github}" class="btn" style="margin: 0.5rem; text-decoration: none;">
                <i class="fab fa-github"></i> View Code
            </a>
            <a href="${project.demo}" class="btn" style="margin: 0.5rem; text-decoration: none; background: linear-gradient(135deg, #28a745, #20c997);">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
        </div>
    `;
    
    document.getElementById('project-details').innerHTML = detailsHtml;
    openModal('project-modal');
}

// Enhanced plot generation with better error handling
async function generateNewPlots() {
    const btn = document.getElementById('generate-btn-text');
    const originalText = btn.textContent;
    const btnElement = btn.parentElement;
    
    // Show loading state
    btn.innerHTML = '<span class="loading"></span> Generating...';
    btnElement.disabled = true;
    
    try {
        // Since we can't make actual server calls in a static site,
        // we'll simulate the plot generation by refreshing with new timestamps
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
        
        // Refresh images with cache busting
        const timestamp = new Date().getTime();
        const images = document.querySelectorAll('.viz-item img');
        
        images.forEach((img, index) => {
            const newSrc = `plots/plot${index + 1}.png?t=${timestamp}`;
            img.style.opacity = '0.5';
            img.src = newSrc;
            
            img.onload = function() {
                this.style.opacity = '1';
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            };
        });
        
        // Success feedback
        btn.innerHTML = '<i class="fas fa-check"></i> Plots Generated!';
        btnElement.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btnElement.style.background = '';
            btnElement.disabled = false;
        }, 3000);
        
    } catch (error) {
        console.error('Error generating plots:', error);
        btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error - Try Again';
        btnElement.style.background = 'linear-gradient(135deg, #dc3545, #c82333)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btnElement.style.background = '';
            btnElement.disabled = false;
        }, 3000);
    }
}

// Enhanced image modal for visualizations
function openImageModal(img) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    
    modalImg.src = img.src;
    modalTitle.textContent = img.alt;
    modalImg.style.opacity = '0';
    
    openModal('image-modal');
    
    modalImg.onload = function() {
        this.style.transition = 'opacity 0.3s ease';
        this.style.opacity = '1';
    };
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

// Enhanced typing animation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    element.style.borderRight = '3px solid #667eea';
    element.style.animation = 'blink 1s infinite';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                element.style.borderRight = 'none';
                element.style.animation = 'none';
            }, 1000);
        }
    }
    type();
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all cards and project items
    document.querySelectorAll('.card, .project-card, .viz-item').forEach(el => {
        observer.observe(el);
    });
}

// Particle background effect
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            animation: float ${Math.random() * 10 + 10}s infinite linear;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Initialize animations on page load
window.addEventListener('load', function() {
    const nameTitle = document.getElementById('name-title');
    if (nameTitle) {
        const originalText = nameTitle.textContent;
        typeWriter(nameTitle, originalText, 150);
    }
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Create particle background
    createParticles();
});

// Add loading screen
function showLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
        <div style="text-align: center;">
            <div class="loading" style="width: 50px; height: 50px; border-width: 5px; margin: 0 auto 20px;"></div>
            <h3 style="color: white; margin: 0;">Loading Portfolio...</h3>
        </div>
    `;
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(loader);
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(loader);
            }, 500);
        }, 1000);
    });
}

// Initialize loading screen
if (document.readyState === 'loading') {
    showLoadingScreen();
}