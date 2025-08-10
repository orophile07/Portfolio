// Typewriter animation script

// New typewriter for bio with color support
function typeWriterBio(element, parts, partIdx = 0, charIdx = 0) {
    if (partIdx >= parts.length) return;

    // If this is a colored part
    if (parts[partIdx].color) {
        // Create or get the span for this part
        let span = element.querySelectorAll('span[data-bio-part]')[partIdx];
        if (!span) {
            span = document.createElement('span');
            span.setAttribute('data-bio-part', partIdx);
            span.style.color = parts[partIdx].color;
            span.style.fontWeight = "600";
            element.appendChild(span);
        }
        span.textContent += parts[partIdx].text[charIdx];
        if (charIdx + 1 < parts[partIdx].text.length) {
            setTimeout(() => typeWriterBio(element, parts, partIdx, charIdx + 1), 70);
        } else {
            setTimeout(() => typeWriterBio(element, parts, partIdx + 1, 0), 70);
        }
    } else {
        // Plain text part
        element.innerHTML += parts[partIdx].text[charIdx];
        if (charIdx + 1 < parts[partIdx].text.length) {
            setTimeout(() => typeWriterBio(element, parts, partIdx, charIdx + 1), 70);
        } else {
            setTimeout(() => typeWriterBio(element, parts, partIdx + 1, 0), 70);
        }
    }
}

function typeWriter(textElement, text, i = 0, callback) {
    if (i < text.length) {
        // Check if the current segment is an HTML tag (e.g., <span>)
        if (text.substring(i, i + 1) === '<') {
            const tagEnd = text.indexOf('>', i);
            if (tagEnd !== -1) {
                // Append the entire tag
                textElement.innerHTML += text.substring(i, tagEnd + 1);
                i = tagEnd + 1;
            } else {
                // If tag is malformed, just append character
                textElement.innerHTML += text.charAt(i);
                i++;
            }
        } else {
            // Append regular character
            textElement.innerHTML += text.charAt(i);
            i++;
        }
        setTimeout(() => typeWriter(textElement, text, i, callback), 70); // Typing speed
    } else if (callback) {
        callback();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.getElementById('name-typewriter');
    const roleInterestElement = document.getElementById('role-interest-typewriter');

    const nameText = "Soham Ghosh";
    // Build the bio as an array of parts for color support
    const roleInterestParts = [
        { text: "A passionate ", color: null },
        { text: "Data Analyst", color: "#34d399" },
        { text: " with a love for ", color: null },
        { text: "Gen AI", color: "#34d399" },
        { text: ".", color: null }
    ];

    // Floating scroll-to-home button logic
    const scrollToHomeBtn = document.getElementById('scrollToHomeBtn');
    const homeSection = document.getElementById('home');

    window.addEventListener('scroll', () => {
        // Show the button when the user scrolls past the top of the home section
        if (window.scrollY > (homeSection?.offsetHeight || 300) * 0.7) {
            scrollToHomeBtn.style.display = 'flex'; // Use 'flex' to make it visible
        } else {
            scrollToHomeBtn.style.display = 'none'; // Hide the button
        }
    });

    scrollToHomeBtn.addEventListener('click', () => {
        if (homeSection) {
            homeSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Clear initial content to prevent shifting
    if (nameElement) {
        nameElement.textContent = '';
        typeWriter(nameElement, nameText);
    }
    if (roleInterestElement) {
        roleInterestElement.innerHTML = '';
        typeWriterBio(roleInterestElement, roleInterestParts);
    }

    // WhatsApp send message functionality
    const sendBtn = document.getElementById('sendMessageBtn');
    if (sendBtn) {
        sendBtn.addEventListener('click', function () {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            const whatsappNumber = '+918777026712'; // Your WhatsApp number

            // Construct the message
            let whatsappMessage = `Hello Soham,\n\n`;
            whatsappMessage += `Name: ${name}\n`;
            whatsappMessage += `Email: ${email}\n`;
            whatsappMessage += `Subject: ${subject}\n\n`;
            whatsappMessage += `Message:\n${message}`;

            // Encode the message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);

            // Create the WhatsApp URL
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank');
        });
    }

    const homeNavLink = document.querySelector('a[href="#home"]');
    if (homeNavLink) {
        homeNavLink.addEventListener('click', function (e) {
            e.preventDefault();
            const homeSection = document.getElementById('home');
            if (homeSection) {
                homeSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Responsive Navbar Dropdown Logic
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navbarMenu = document.getElementById('navbar-menu');

    hamburgerBtn.addEventListener('click', () => {
        navbarMenu.classList.toggle('-translate-x-full');
    });

    // Close mobile menu on link click
    navbarMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navbarMenu.classList.add('-translate-x-full');
        }
        );
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                entry.target.classList.remove('animate');
            }
        });
    }, {
        threshold: 0.2 // 20% of the element is visible
    });

    document.querySelectorAll('.slide-in-left, .slide-in-right, .fade-in').forEach(el => {
        observer.observe(el);
    });
});
