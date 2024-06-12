# Use an official Nginx image as the base image
FROM nginx:alpine

# Copy the HTML and JavaScript files into the Nginx HTML directory
COPY index.html /usr/share/nginx/html
COPY script.js /usr/share/nginx/html
COPY styles.css /usr/share/nginx/html

# Expose port 80 to allow external access
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
