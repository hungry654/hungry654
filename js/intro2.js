// 스킬 데이터 정의
const skillsData = [
    { title: 'C언어', percent: 25, color: '#7C96AB' },
    { title: '토익영어공부', percent: 40, color: '#BFCCB5' },
    { title: 'JavaScript', percent: 15, color: '#E3B7A0' },
    { title: '프로그래밍 이론', percent: 10, color: '#B7B7B7' },
    { title: '프로그래밍 실습', percent: 10, color: '#D7C0AE' }
];

class SkillsChart {
    constructor(containerId, data) {
        this.container = document.getElementById(containerId);
        this.data = data;
        this.init();
    }

    init() {
        // 툴크 생성
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'tooltip';
        this.container.appendChild(this.tooltip);

        // 세그먼트 생성
        this.createSegments();
        
        // 이벤트 리스너 설정
        this.setupEventListeners();
    }

    createSegments() {
        let startAngle = 0;
        this.data.forEach((skill, index) => {
            const segment = document.createElement('div');
            segment.className = `pie-segment segment${index + 1}`;
            segment.setAttribute('data-title', skill.title);
            segment.setAttribute('data-percent', `${skill.percent}%`);
            
            // 각도 계산
            const degrees = (skill.percent / 100) * 360;
            const endAngle = startAngle + degrees;
            
            // clip-path 계산
            const path = this.calculateClipPath(startAngle, endAngle);
            segment.style.clipPath = path;
            segment.style.backgroundColor = skill.color;
            segment.style.zIndex = index + 1;
            
            this.container.appendChild(segment);
            startAngle = endAngle;
        });
    }

    calculateClipPath(startAngle, endAngle) {
        const center = { x: 50, y: 50 };
        const radius = 50;
        
        // 시작점과 끝점 계산
        const start = this.getCoordinatesForAngle(startAngle);
        const end = this.getCoordinatesForAngle(endAngle);
        
        // clip-path 경로 생성
        return `polygon(50% 50%, ${start.x}% ${start.y}%, ${end.x}% ${end.y}%)`;
    }

    getCoordinatesForAngle(angle) {
        const radians = (angle - 90) * (Math.PI / 180);
        return {
            x: 50 + 50 * Math.cos(radians),
            y: 50 + 50 * Math.sin(radians)
        };
    }

    setupEventListeners() {
        const segments = this.container.querySelectorAll('.pie-segment');
        
        segments.forEach(segment => {
            segment.addEventListener('mousemove', (e) => {
                const title = segment.getAttribute('data-title');
                const percent = segment.getAttribute('data-percent');
                
                this.tooltip.textContent = `${title}: ${percent}`;
                this.tooltip.style.display = 'block';
                this.tooltip.style.left = e.clientX + 'px';
                this.tooltip.style.top = e.clientY + 'px';
            });

            segment.addEventListener('mouseleave', () => {
                this.tooltip.style.display = 'none';
            });

            segment.addEventListener('mouseenter', () => {
                segment.style.transform = 'scale(1.05)';
                segment.style.zIndex = 10;
            });

            segment.addEventListener('mouseleave', () => {
                segment.style.transform = 'scale(1)';
                segment.style.zIndex = Array.from(segments).indexOf(segment) + 1;
            });
        });
    }
}

// DOM이 로드되면 차트 초기화
document.addEventListener('DOMContentLoaded', () => {
    new SkillsChart('skills-chart', skillsData);
}); 