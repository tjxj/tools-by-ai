/**
 * 3:4 图片转换器
 */

class ImageProcessor {
    constructor() {
        this.gradients = [
            { name: '深紫', colors: ['#667eea', '#764ba2'] },
            { name: '海洋', colors: ['#2193b0', '#6dd5ed'] },
            { name: '日落', colors: ['#ff512f', '#f09819'] },
            { name: '粉紫', colors: ['#ee9ca7', '#ffdde1'] },
            { name: '森林', colors: ['#134e5e', '#71b280'] },
            { name: '午夜', colors: ['#232526', '#414345'] },
            { name: '火焰', colors: ['#f12711', '#f5af19'] },
            { name: '薄荷', colors: ['#00b09b', '#96c93d'] },
            { name: '玫瑰', colors: ['#ff0844', '#ffb199'] },
            { name: '深蓝', colors: ['#0f0c29', '#302b63'] },
            { name: '极光', colors: ['#43cea2', '#185a9d'] },
            { name: '暗金', colors: ['#12100e', '#2b4162'] },
        ];

        this.settings = {
            gradient: this.gradients[0].colors,
            padding: 20,
            rounded: 12,
            shadow: 30,
            outputWidth: 900,
            quality: 0.92,
            watermarkText: 'Ai学习的老章',
            watermarkEnabled: true
        };

        this.images = [];
        this.init();
    }

    init() {
        this.cacheDOM();
        this.renderGradients();
        this.bindEvents();
        this.setupGlobalDrop();
    }

    cacheDOM() {
        this.uploadZone = document.getElementById('upload-zone');
        this.fileInput = document.getElementById('file-input');
        this.gradientGrid = document.getElementById('gradient-grid');
        this.colorStart = document.getElementById('color-start');
        this.colorEnd = document.getElementById('color-end');
        this.applyCustomBtn = document.getElementById('apply-custom');
        this.paddingSlider = document.getElementById('padding-slider');
        this.paddingValue = document.getElementById('padding-value');
        this.roundedSlider = document.getElementById('rounded-slider');
        this.roundedValue = document.getElementById('rounded-value');
        this.shadowSlider = document.getElementById('shadow-slider');
        this.shadowValue = document.getElementById('shadow-value');
        this.outputWidth = document.getElementById('output-width');
        this.outputQuality = document.getElementById('output-quality');
        this.downloadAllBtn = document.getElementById('download-all');
        this.clearAllBtn = document.getElementById('clear-all');
        this.previewGrid = document.getElementById('preview-grid');
        this.emptyState = document.getElementById('empty-state');
        this.imageCount = document.getElementById('image-count');
        this.modal = document.getElementById('preview-modal');
        this.modalImage = document.getElementById('modal-image');
        this.modalClose = document.getElementById('modal-close');
        this.downloadSingleBtn = document.getElementById('download-single');
        this.watermarkText = document.getElementById('watermark-text');
        this.watermarkEnabled = document.getElementById('watermark-enabled');
    }

    renderGradients() {
        this.gradientGrid.innerHTML = '';
        this.gradients.forEach((gradient, index) => {
            const div = document.createElement('div');
            div.className = `gradient-option${index === 0 ? ' active' : ''}`;
            div.style.background = `linear-gradient(135deg, ${gradient.colors[0]}, ${gradient.colors[1]})`;
            div.dataset.index = index;
            div.title = gradient.name;
            this.gradientGrid.appendChild(div);
        });
    }

    setupGlobalDrop() {
        // 全局拖拽支持
        document.body.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadZone.classList.add('dragover');
        });

        document.body.addEventListener('dragleave', (e) => {
            if (!e.relatedTarget || e.relatedTarget === document.documentElement) {
                this.uploadZone.classList.remove('dragover');
            }
        });

        document.body.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadZone.classList.remove('dragover');
            this.handleFiles(e.dataTransfer.files);
        });
    }

    bindEvents() {
        // 上传
        this.uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.uploadZone.classList.add('dragover');
        });

        this.uploadZone.addEventListener('dragleave', (e) => {
            e.stopPropagation();
            this.uploadZone.classList.remove('dragover');
        });

        this.uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.uploadZone.classList.remove('dragover');
            this.handleFiles(e.dataTransfer.files);
        });

        this.fileInput.addEventListener('change', (e) => {
            this.handleFiles(e.target.files);
        });

        // 渐变选择
        this.gradientGrid.addEventListener('click', (e) => {
            const option = e.target.closest('.gradient-option');
            if (option) {
                this.gradientGrid.querySelectorAll('.gradient-option').forEach(el => el.classList.remove('active'));
                option.classList.add('active');
                this.settings.gradient = this.gradients[parseInt(option.dataset.index)].colors;
                this.updateAllPreviews();
            }
        });

        this.applyCustomBtn.addEventListener('click', () => {
            this.settings.gradient = [this.colorStart.value, this.colorEnd.value];
            this.gradientGrid.querySelectorAll('.gradient-option').forEach(el => el.classList.remove('active'));
            this.updateAllPreviews();
        });

        // 滑块
        this.paddingSlider.addEventListener('input', (e) => {
            this.settings.padding = parseInt(e.target.value);
            this.paddingValue.textContent = this.settings.padding;
            this.updateAllPreviews();
        });

        this.roundedSlider.addEventListener('input', (e) => {
            this.settings.rounded = parseInt(e.target.value);
            this.roundedValue.textContent = this.settings.rounded;
            this.updateAllPreviews();
        });

        this.shadowSlider.addEventListener('input', (e) => {
            this.settings.shadow = parseInt(e.target.value);
            this.shadowValue.textContent = this.settings.shadow;
            this.updateAllPreviews();
        });

        // 输出设置
        this.outputWidth.addEventListener('change', (e) => {
            this.settings.outputWidth = parseInt(e.target.value);
        });

        this.outputQuality.addEventListener('change', (e) => {
            this.settings.quality = parseFloat(e.target.value);
        });

        // 水印
        this.watermarkText.addEventListener('input', (e) => {
            this.settings.watermarkText = e.target.value;
        });

        this.watermarkEnabled.addEventListener('change', (e) => {
            this.settings.watermarkEnabled = e.target.checked;
        });

        // 按钮
        this.downloadAllBtn.addEventListener('click', () => this.downloadAll());
        this.clearAllBtn.addEventListener('click', () => this.clearAll());

        // 模态框
        this.modalClose.addEventListener('click', () => this.closeModal());
        this.modal.querySelector('.modal-overlay').addEventListener('click', () => this.closeModal());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }

    handleFiles(files) {
        const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
        if (imageFiles.length === 0) return;

        imageFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const imageData = {
                        id: Date.now() + Math.random(),
                        name: file.name,
                        originalImage: img,
                        originalSrc: e.target.result
                    };
                    this.images.push(imageData);
                    this.renderPreviewCard(imageData);
                    this.updateUI();
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });

        this.fileInput.value = '';
    }

    renderPreviewCard(imageData) {
        this.emptyState.style.display = 'none';

        const card = document.createElement('div');
        card.className = 'preview-card';
        card.dataset.id = imageData.id;

        const inner = document.createElement('div');
        inner.className = 'preview-card-inner';
        inner.style.background = `linear-gradient(135deg, ${this.settings.gradient[0]}, ${this.settings.gradient[1]})`;
        inner.style.padding = `${this.settings.padding / 4}px`;

        const img = document.createElement('img');
        img.src = imageData.originalSrc;
        img.style.borderRadius = `${this.settings.rounded}px`;
        img.style.boxShadow = `0 ${this.settings.shadow / 4}px ${this.settings.shadow}px rgba(0,0,0,${this.settings.shadow / 100})`;

        inner.appendChild(img);

        const overlay = document.createElement('div');
        overlay.className = 'preview-card-overlay';
        overlay.innerHTML = `
            <button class="overlay-btn overlay-btn-view" title="预览">👁️</button>
            <button class="overlay-btn overlay-btn-download" title="下载">⬇️</button>
            <button class="overlay-btn overlay-btn-delete" title="删除">🗑️</button>
        `;

        const name = document.createElement('div');
        name.className = 'preview-card-name';
        name.textContent = imageData.name;

        card.appendChild(inner);
        card.appendChild(overlay);
        card.appendChild(name);

        overlay.querySelector('.overlay-btn-view').addEventListener('click', (e) => {
            e.stopPropagation();
            this.showModal(imageData);
        });

        overlay.querySelector('.overlay-btn-download').addEventListener('click', (e) => {
            e.stopPropagation();
            this.downloadSingle(imageData);
        });

        overlay.querySelector('.overlay-btn-delete').addEventListener('click', (e) => {
            e.stopPropagation();
            this.deleteImage(imageData.id);
        });

        card.addEventListener('click', () => this.showModal(imageData));

        this.previewGrid.appendChild(card);
    }

    updateAllPreviews() {
        const cards = this.previewGrid.querySelectorAll('.preview-card');
        cards.forEach(card => {
            const inner = card.querySelector('.preview-card-inner');
            const img = inner.querySelector('img');
            inner.style.background = `linear-gradient(135deg, ${this.settings.gradient[0]}, ${this.settings.gradient[1]})`;
            inner.style.padding = `${this.settings.padding / 4}px`;
            img.style.borderRadius = `${this.settings.rounded}px`;
            img.style.boxShadow = `0 ${this.settings.shadow / 4}px ${this.settings.shadow}px rgba(0,0,0,${this.settings.shadow / 100})`;
        });
    }

    updateUI() {
        const count = this.images.length;
        this.imageCount.textContent = `${count} 张图片`;
        this.downloadAllBtn.disabled = count === 0;
        this.clearAllBtn.disabled = count === 0;
        if (count === 0) this.emptyState.style.display = 'flex';
    }

    deleteImage(id) {
        this.images = this.images.filter(img => img.id !== id);
        const card = this.previewGrid.querySelector(`[data-id="${id}"]`);
        if (card) {
            card.style.animation = 'fadeIn 0.2s ease-out reverse';
            setTimeout(() => {
                card.remove();
                this.updateUI();
            }, 200);
        }
    }

    clearAll() {
        if (!confirm('确定清空全部图片？')) return;
        this.images = [];
        this.previewGrid.querySelectorAll('.preview-card').forEach(card => card.remove());
        this.updateUI();
    }

    showModal(imageData) {
        const canvas = this.processImage(imageData.originalImage);
        this.modalImage.src = canvas.toDataURL('image/png');
        this.currentModalImage = imageData;
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.downloadSingleBtn.onclick = () => this.downloadSingle(imageData);
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    processImage(img) {
        const targetWidth = this.settings.outputWidth;
        const targetHeight = Math.round(targetWidth * 4 / 3);

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');

        // 渐变背景
        const gradient = ctx.createLinearGradient(0, 0, targetWidth, targetHeight);
        gradient.addColorStop(0, this.settings.gradient[0]);
        gradient.addColorStop(1, this.settings.gradient[1]);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, targetWidth, targetHeight);

        // 计算绘制区域
        const padding = this.settings.padding * (targetWidth / 900);
        const availableWidth = targetWidth - padding * 2;
        const availableHeight = targetHeight - padding * 2;

        const imgRatio = img.naturalWidth / img.naturalHeight;
        const areaRatio = availableWidth / availableHeight;

        let drawWidth, drawHeight;
        if (imgRatio > areaRatio) {
            drawWidth = availableWidth;
            drawHeight = drawWidth / imgRatio;
        } else {
            drawHeight = availableHeight;
            drawWidth = drawHeight * imgRatio;
        }

        const x = (targetWidth - drawWidth) / 2;
        const y = (targetHeight - drawHeight) / 2;

        // 保存状态用于圆角裁剪
        ctx.save();

        // 阴影
        if (this.settings.shadow > 0) {
            ctx.shadowColor = `rgba(0, 0, 0, ${this.settings.shadow / 100})`;
            ctx.shadowBlur = this.settings.shadow * 1.5;
            ctx.shadowOffsetY = this.settings.shadow / 3;
        }

        // 圆角裁剪
        const radius = this.settings.rounded * (targetWidth / 900);
        this.roundedRect(ctx, x, y, drawWidth, drawHeight, radius);
        ctx.clip();
        ctx.drawImage(img, x, y, drawWidth, drawHeight);

        // 恢复状态（移除 clip）
        ctx.restore();

        // 绘制水印 (在 clip 区域外绘制)
        if (this.settings.watermarkEnabled && this.settings.watermarkText) {
            const fontSize = Math.round(targetWidth * 0.02); // 约18px at 900px

            // 使用更好的中文字体
            ctx.font = `500 ${fontSize}px "PingFang SC", "Noto Sans SC", "Microsoft YaHei", "Hiragino Sans GB", sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';

            // 文字阴影增加可读性
            ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
            ctx.shadowBlur = 6;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 2;

            // 白色半透明文字
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.fillText(this.settings.watermarkText, targetWidth / 2, targetHeight - fontSize);
        }

        return canvas;
    }

    roundedRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    }

    async downloadSingle(imageData) {
        const canvas = this.processImage(imageData.originalImage);
        canvas.toBlob((blob) => {
            const link = document.createElement('a');
            link.download = `${imageData.name.replace(/\.[^/.]+$/, '')}_3x4.png`;
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(link.href);
        }, 'image/png', this.settings.quality);
    }

    async downloadAll() {
        if (this.images.length === 0) return;

        this.downloadAllBtn.disabled = true;
        this.downloadAllBtn.textContent = '⏳ 处理中...';

        try {
            const zip = new JSZip();

            for (let i = 0; i < this.images.length; i++) {
                const imageData = this.images[i];
                const canvas = this.processImage(imageData.originalImage);
                const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png', this.settings.quality));
                zip.file(`${imageData.name.replace(/\.[^/.]+$/, '')}_3x4.png`, blob);
                this.downloadAllBtn.textContent = `⏳ ${Math.round(((i + 1) / this.images.length) * 100)}%`;
            }

            const content = await zip.generateAsync({ type: 'blob' });
            const link = document.createElement('a');
            link.download = `3x4_images_${Date.now()}.zip`;
            link.href = URL.createObjectURL(content);
            link.click();
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('下载失败:', error);
            alert('下载失败，请重试');
        } finally {
            this.downloadAllBtn.disabled = false;
            this.downloadAllBtn.textContent = '⬇️ 下载全部';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => new ImageProcessor());