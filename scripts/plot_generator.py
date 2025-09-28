import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
import pandas as pd
from datetime import datetime
import os

# Set up modern plotting style
plt.style.use('seaborn-v0_8-darkgrid')
sns.set_palette("husl")

# Ensure plots directory exists
os.makedirs("../plots", exist_ok=True)

def create_enhanced_plots():
    """Generate multiple enhanced visualizations"""
    
    # Plot 1: Enhanced Sine Wave with multiple functions
    fig, ax = plt.subplots(figsize=(12, 8))
    x = np.linspace(0, 4*np.pi, 1000)
    
    # Multiple sine waves
    y1 = np.sin(x)
    y2 = np.sin(2*x) * 0.5
    y3 = np.sin(x/2) * 1.5
    
    ax.plot(x, y1, linewidth=3, label='sin(x)', alpha=0.8)
    ax.plot(x, y2, linewidth=3, label='0.5×sin(2x)', alpha=0.8)
    ax.plot(x, y3, linewidth=3, label='1.5×sin(x/2)', alpha=0.8)
    
    ax.fill_between(x, y1, alpha=0.3)
    ax.set_title("Harmonic Wave Functions", fontsize=20, pad=20, fontweight='bold')
    ax.set_xlabel("x (radians)", fontsize=14)
    ax.set_ylabel("Amplitude", fontsize=14)
    ax.legend(fontsize=12, framealpha=0.9)
    ax.grid(True, alpha=0.3)
    
    # Add text annotation
    ax.annotate('Peak amplitude', xy=(np.pi/2, 1), xytext=(np.pi, 1.5),
                arrowprops=dict(arrowstyle='->', color='red', alpha=0.7),
                fontsize=12, ha='center')
    
    plt.tight_layout()
    plt.savefig("../plots/plot1.png", dpi=300, bbox_inches='tight', 
                facecolor='white', edgecolor='none')
    plt.close()
    
    # Plot 2: Enhanced scatter plot with statistical elements
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 8))
    
    # Generate correlated data
    np.random.seed(42)
    n_points = 200
    x = np.random.normal(50, 15, n_points)
    noise = np.random.normal(0, 10, n_points)
    y = 2 * x + 30 + noise
    colors = x + y  # Color by sum for visual appeal
    
    # Left plot: Scatter with regression
    scatter = ax1.scatter(x, y, c=colors, s=100, alpha=0.7, cmap='viridis', edgecolors='black', linewidth=0.5)
    
    # Add regression line
    z = np.polyfit(x, y, 1)
    p = np.poly1d(z)
    ax1.plot(x, p(x), "r--", linewidth=3, alpha=0.8, label=f'y = {z[0]:.2f}x + {z[1]:.2f}')
    
    ax1.set_title("Correlated Data Analysis", fontsize=18, fontweight='bold', pad=20)
    ax1.set_xlabel("X Variable", fontsize=14)
    ax1.set_ylabel("Y Variable", fontsize=14)
    ax1.legend(fontsize=12)
    ax1.grid(True, alpha=0.3)
    
    # Add colorbar
    cbar = plt.colorbar(scatter, ax=ax1)
    cbar.set_label('X + Y Value', fontsize=12)
    
    # Right plot: Distribution histograms
    ax2.hist(x, bins=30, alpha=0.7, label='X Distribution', color='skyblue', edgecolor='black')
    ax2_twin = ax2.twinx()
    ax2_twin.hist(y, bins=30, alpha=0.7, label='Y Distribution', color='lightcoral', 
                  edgecolor='black', orientation='horizontal')
    
    ax2.set_title("Variable Distributions", fontsize=18, fontweight='bold', pad=20)
    ax2.set_xlabel("Value", fontsize=14)
    ax2.set_ylabel("X Frequency", fontsize=14)
    ax2_twin.set_ylabel("Y Frequency", fontsize=14)
    ax2.legend(loc='upper right')
    ax2_twin.legend(loc='lower right')
    ax2.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.savefig("../plots/plot2.png", dpi=300, bbox_inches='tight', 
                facecolor='white', edgecolor='none')
    plt.close()
    
    # Plot 3: Heatmap correlation matrix (bonus plot)
    fig, ax = plt.subplots(figsize=(10, 8))
    
    # Generate sample correlation data
    variables = ['Deep Learning', 'NLP', 'Computer Vision', 'Data Analysis', 'Statistics']
    np.random.seed(123)
    correlation_matrix = np.random.rand(5, 5)
    correlation_matrix = (correlation_matrix + correlation_matrix.T) / 2  # Make symmetric
    np.fill_diagonal(correlation_matrix, 1)  # Perfect self-correlation
    
    # Create heatmap
    sns.heatmap(correlation_matrix, 
                xticklabels=variables, 
                yticklabels=variables,
                annot=True, 
                cmap='RdYlBu_r', 
                center=0.5,
                square=True,
                fmt='.2f',
                cbar_kws={'label': 'Correlation Coefficient'},
                ax=ax)
    
    ax.set_title("Skills Correlation Matrix", fontsize=18, fontweight='bold', pad=20)
    plt.xticks(rotation=45, ha='right')
    plt.yticks(rotation=0)
    
    plt.tight_layout()
    plt.savefig("../plots/plot3.png", dpi=300, bbox_inches='tight', 
                facecolor='white', edgecolor='none')
    plt.close()
    
    print(f"Enhanced plots generated successfully at {datetime.now()}")

if __name__ == "__main__":
    create_enhanced_plots()