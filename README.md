# Babynama - Frontend Developer Intern Assignment

**Objective:** Build a small, self-contained feature in Next.js.  
**Time Taken:** 2 hours.

---

### **Live URL**: (https://babynama-assignment-three.vercel.app/webinars)

### **Choices Made**
 - Added a countdown timer on each webinar card and hero carousel to show time remaining until the event starts (adds urgency).
   
   **Why this choice**: We added the countdown timer to create urgency and encourage user engagement. Timers are a proven UX strategy to increase conversions — in this case, motivating users to register before time runs out. It also keeps the content dynamic, making the UI feel more “alive” and real-time. Technically, it required managing setInterval and useEffect carefully to avoid memory leaks and to ensure accuracy without unnecessary rerenders. This feature improves both functionality and psychological appeal, making it one of the highest-impact additions to the page.
   
 **Other choices**
 - Implemented a custom carousel to showcase the top 4 most registered webinars using transitions and timing logic.
 - Created a separate grid layout for the Most Awaited Webinars section to improve scalability and responsiveness.
 - Chose to use Tailwind CSS utility classes for fast styling and consistent design.
 - Included category-based filtering and tag-based discovery, helping users find relevant webinars easily.
 - Developed a newsletter subscription section, encouraging users to get updates on new webinars.
 - Added speaker, title filters, enabling quick narrowing down of the webinar list.
 - Created a basic testimonial section, displaying reviews to build trust and social proof.
 - Added basic rating representation, allowing webinars to visually show appreciation for the speaker.
 - Ensured accessibility improvements, such as aria-labels, keyboard navigation, and high-contrast text for readability.
 - Optimized mobile experience, including a swipe-friendly carousel and responsive grid layout.
 - Used blur effects on hero text areas for better readability without masking the image fully.

### **Roadblock & Learning**
- Duplicate Carousel Rendering: Initially, the hero carousel was showing the same image twice in a stacked transition. This was due to accidentally duplicating the overlay content (<img> and content div) inside the .map() loop.
      Learning: I debugged by removing one layer and restructuring the absolute elements properly so only one copy of the image and content gets rendered. This helped me better understand how nested absolute elements behave in React + Tailwind setups.

- Text Visibility on Background Images: The overlaid text on images wasn't always readable, especially for light or detailed backgrounds.
      Learning: I experimented with gradients and semi-transparent backgrounds but settled on using blur-effect and drop-shadow utilities.

- Countdown Timer Logic: While adding the countdown timer to each webinar, I initially placed the timer calculation directly in the render, which caused unnecessary rerenders and performance issues.
      Learning: I moved the timer logic into useEffect with intervals, ensuring each timer updated only once per second. This improved efficiency. 

- Filtering by Date & Category: Implementing multi-filter logic was trickier than expected. Combining text search, category filters, and date comparison required restructuring the state logic and chaining multiple conditions.
      Learning: I learned how to write clean and composable filter logic, and to debounce search input in real apps for performance.

### **Screenshots**
![HeroCarosal](https://github.com/user-attachments/assets/7d72fb6b-679a-476c-b096-8e7e80264db3)
(Hero Carosal)

![MostAwaitedWebinars](https://github.com/user-attachments/assets/08d5070d-9cd8-482b-83e8-13efeacd345f)
(Most awaited webinars)

![Screenshot_Rating_Representation](https://github.com/user-attachments/assets/7832f3c1-7335-4e8b-9045-51b858c7d33b)
(Basic rating representation)
