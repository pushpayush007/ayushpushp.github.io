import matplotlib.pyplot as plt
import numpy as np

# Example Plot 1: Sine Wave
x = np.linspace(0, 10, 100)
y = np.sin(x)
plt.plot(x, y)
plt.title("Sine Wave")
plt.xlabel("x")
plt.ylabel("sin(x)")
plt.savefig("../plots/plot1.png")
plt.close()

# Example Plot 2: Random Scatter
x = np.random.rand(50)
y = np.random.rand(50)
plt.scatter(x, y, color='orange')
plt.title("Random Scatter Plot")
plt.xlabel("x")
plt.ylabel("y")
plt.savefig("../plots/plot2.png")
plt.close()