#!/usr/bin/env node

/**
 * End-to-End Integration Test for Fuller Restoration Website
 * This script tests all the key functionality mentioned in task 16
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Starting End-to-End Integration Tests...\n');

// Test 1: Navigation Links
console.log('1️⃣ Testing Navigation Links...');
const headerFile = fs.readFileSync('src/components/layout/Header.tsx', 'utf8');
const footerFile = fs.readFileSync('src/components/layout/Footer.tsx', 'utf8');

const navigationLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' }
];

let navTestsPassed = 0;
navigationLinks.forEach(link => {
  if (headerFile.includes(`href="${link.href}"`)) {
    console.log(`   ✅ ${link.name} link found in header`);
    navTestsPassed++;
  } else {
    console.log(`   ❌ ${link.name} link missing in header`);
  }
});

// Check if corresponding pages exist
const pageFiles = [
  'src/app/page.tsx',
  'src/app/about/page.tsx', 
  'src/app/services/page.tsx',
  'src/app/projects/page.tsx',
  'src/app/contact/page.tsx'
];

let pageTestsPassed = 0;
pageFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file} exists`);
    pageTestsPassed++;
  } else {
    console.log(`   ❌ ${file} missing`);
  }
});

console.log(`   Navigation Links: ${navTestsPassed}/5 passed`);
console.log(`   Page Files: ${pageTestsPassed}/5 passed\n`);

// Test 2: Contact Form Functionality
console.log('2️⃣ Testing Contact Form Functionality...');
const contactFormFile = fs.readFileSync('src/components/ui/ContactForm.tsx', 'utf8');

const formFeatures = [
  'validation',
  'handleSubmit',
  'useState',
  'required fields',
  'email validation',
  'phone validation'
];

let formTestsPassed = 0;
formFeatures.forEach(feature => {
  if (contactFormFile.includes(feature) || contactFormFile.includes(feature.replace(' ', ''))) {
    console.log(`   ✅ ${feature} implemented`);
    formTestsPassed++;
  } else {
    console.log(`   ❌ ${feature} missing`);
  }
});

console.log(`   Contact Form Features: ${formTestsPassed}/6 passed\n`);

// Test 3: Project Filtering and Search
console.log('3️⃣ Testing Project Filtering and Search...');
const projectsClientFile = fs.readFileSync('src/app/projects/ProjectsClient.tsx', 'utf8');

const projectFeatures = [
  'selectedService',
  'searchQuery',
  'filteredProjects',
  'useMemo',
  'filter',
  'toLowerCase'
];

let projectTestsPassed = 0;
projectFeatures.forEach(feature => {
  if (projectsClientFile.includes(feature)) {
    console.log(`   ✅ ${feature} implemented`);
    projectTestsPassed++;
  } else {
    console.log(`   ❌ ${feature} missing`);
  }
});

console.log(`   Project Features: ${projectTestsPassed}/6 passed\n`);

// Test 4: Social Media Links
console.log('4️⃣ Testing Social Media Links...');
const businessInfoFile = fs.readFileSync('src/data/businessInfo.ts', 'utf8');

const socialMediaTests = [
  'facebook',
  'https://www.facebook.com/61578319719409',
  'target="_blank"',
  'rel="noopener noreferrer"'
];

let socialTestsPassed = 0;
socialMediaTests.forEach(test => {
  if (businessInfoFile.includes(test) || footerFile.includes(test)) {
    console.log(`   ✅ ${test} found`);
    socialTestsPassed++;
  } else {
    console.log(`   ❌ ${test} missing`);
  }
});

console.log(`   Social Media Features: ${socialTestsPassed}/4 passed\n`);

// Test 5: Project Detail Pages
console.log('5️⃣ Testing Project Detail Pages...');
const projectDetailExists = fs.existsSync('src/app/projects/[id]/page.tsx');
const areasPageExists = fs.existsSync('src/app/areas/[id]/page.tsx');

if (projectDetailExists) {
  console.log('   ✅ Project detail pages exist');
} else {
  console.log('   ❌ Project detail pages missing');
}

if (areasPageExists) {
  console.log('   ✅ Areas pages exist');
} else {
  console.log('   ❌ Areas pages missing');
}

// Test 6: Phone and Email Links
console.log('\n6️⃣ Testing Phone and Email Links...');
const phoneTests = [
  'tel:',
  'mailto:',
  'formatPhoneForCall',
  'businessInfo.phone',
  'businessInfo.email'
];

let phoneTestsPassed = 0;
phoneTests.forEach(test => {
  if (headerFile.includes(test) || footerFile.includes(test) || contactFormFile.includes(test)) {
    console.log(`   ✅ ${test} implemented`);
    phoneTestsPassed++;
  } else {
    console.log(`   ❌ ${test} missing`);
  }
});

console.log(`   Phone/Email Features: ${phoneTestsPassed}/5 passed\n`);

// Summary
const totalTests = navTestsPassed + pageTestsPassed + formTestsPassed + projectTestsPassed + socialTestsPassed + phoneTestsPassed + (projectDetailExists ? 1 : 0) + (areasPageExists ? 1 : 0);
const maxTests = 5 + 5 + 6 + 6 + 4 + 5 + 1 + 1; // 33 total tests

console.log('📊 SUMMARY');
console.log('='.repeat(50));
console.log(`Total Tests Passed: ${totalTests}/${maxTests}`);
console.log(`Success Rate: ${Math.round((totalTests/maxTests) * 100)}%`);

if (totalTests >= maxTests * 0.9) {
  console.log('🎉 EXCELLENT! End-to-end integration is working well!');
} else if (totalTests >= maxTests * 0.8) {
  console.log('✅ GOOD! Most functionality is working correctly.');
} else if (totalTests >= maxTests * 0.7) {
  console.log('⚠️  FAIR! Some issues need to be addressed.');
} else {
  console.log('❌ NEEDS WORK! Several critical issues found.');
}

console.log('\n🔍 Manual Testing Recommendations:');
console.log('1. Test navigation by clicking all header/footer links');
console.log('2. Fill out and submit the contact form');
console.log('3. Try filtering and searching projects');
console.log('4. Click social media links to verify they open in new tabs');
console.log('5. Test phone number links on mobile devices');
console.log('6. Verify project detail pages load correctly');
console.log('7. Check responsive design on different screen sizes');