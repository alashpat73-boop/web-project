// إدارة لوحة التحكم
class DashboardManager {
    constructor() {
        this.currentSection = 'dashboard';
        this.currentEditId = null;
        this.currentEditType = null;
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.currentMonth = new Date();
        this.init();
    }
    
    async init() {
        this.setupNavigation();
        this.setupModal();
        this.setupAddButtons();
        this.setupFilters();
        this.setupSearch();
        this.setupCalendar();
        await this.loadUserInfo();
        await this.loadAllData();
        this.updateDashboardStats();
    }
    
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.switchSection(section);
            });
        });
    }
    
    switchSection(section) {
        // إخفاء جميع الأقسام
        document.querySelectorAll('.content-section').forEach(sec => {
            sec.classList.remove('active');
        });
        
        // إظهار القسم المحدد
        document.getElementById(`${section}-section`).classList.add('active');
        
        // تحديث التنقل
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');
        
        this.currentSection = section;
        
        // تحديث البيانات حسب القسم
        if (section === 'dashboard') {
            this.updateDashboardStats();
            this.loadRecentActivities();
        } else if (section === 'lectures') {
            this.renderCalendar();
        }
    }
    
    setupModal() {
        const modal = document.getElementById('modal');
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
        
        const form = document.getElementById('modal-form');
        form.addEventListener('submit', (e) => this.handleSave(e));
    }
    
    setupAddButtons() {
        const addButtons = document.querySelectorAll('.add-btn');
        addButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.dataset.type;
                this.openModal(type);
            });
        });
    }
    
    setupFilters() {
        const filterTabs = document.querySelectorAll('.filter-tab');
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // تحديث التبويب النشط
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // تطبيق التصفية
                this.currentFilter = tab.dataset.filter;
                this.filterTodos();
            });
        });
    }
    
    setupSearch() {
        const searchInput = document.getElementById('notesSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.filterNotes();
            });
        }
    }
    
    setupCalendar() {
        const prevBtn = document.getElementById('prevMonth');
        const nextBtn = document.getElementById('nextMonth');
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
                this.renderCalendar();
            });
            
            nextBtn.addEventListener('click', () => {
                this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
                this.renderCalendar();
            });
        }
    }
    
    async loadUserInfo() {
        try {
            const response = await fetch('api/user.php');
            const result = await response.json();
            
            if (result.success) {
                document.getElementById('welcomeText').textContent = `مرحباً ${result.user.username}`;
            }
        } catch (error) {
            console.error('خطأ في جلب معلومات المستخدم:', error);
        }
    }
    
    async loadAllData() {
        await Promise.all([
            this.loadTodos(),
            this.loadNotes(),
            this.loadLectures(),
            this.loadProjects()
        ]);
    }
    
    async loadTodos() {
        try {
            const response = await fetch('api/todos.php');
            const result = await response.json();
            
            if (result.success) {
                this.todos = result.data;
                this.renderTodos();
            }
        } catch (error) {
            console.error('خطأ في جلب المهام:', error);
        }
    }
    
    async loadNotes() {
        try {
            const response = await fetch('api/notes.php');
            const result = await response.json();
            
            if (result.success) {
                this.notes = result.data;
                this.renderNotes();
            }
        } catch (error) {
            console.error('خطأ في جلب الملاحظات:', error);
        }
    }
    
    async loadLectures() {
        try {
            const response = await fetch('api/lectures.php');
            const result = await response.json();
            
            if (result.success) {
                this.lectures = result.data;
                this.renderLectures();
                this.renderCalendar();
            }
        } catch (error) {
            console.error('خطأ في جلب المحاضرات:', error);
        }
    }
    
    async loadProjects() {
        try {
            const response = await fetch('api/projects.php');
            const result = await response.json();
            
            if (result.success) {
                this.projects = result.data;
                this.renderProjects();
            }
        } catch (error) {
            console.error('خطأ في جلب المشاريع:', error);
        }
    }
    
    renderTodos() {
        const container = document.getElementById('todos-list');
        if (!container || !this.todos) return;
        
        container.innerHTML = '';
        
        const filteredTodos = this.getFilteredTodos();
        
        if (filteredTodos.length === 0) {
            container.innerHTML = '<div class="empty-state">لا توجد مهام لعرضها</div>';
            return;
        }
        
        filteredTodos.forEach(todo => {
            const todoCard = this.createTodoCard(todo);
            container.appendChild(todoCard);
        });F
    }
    
    getFilteredTodos() {
        if (!this.todos) return [];
        
        return this.todos.filter(todo => {
            if (this.currentFilter === 'completed') return todo.completed;
            if (this.currentFilter === 'pending') return !todo.completed;
            return true; // all
        });
    }
    
    filterTodos() {
        this.renderTodos();
    }
    
    renderNotes() {
        const container = document.getElementById('notes-list');
        if (!container || !this.notes) return;
        
        container.innerHTML = '';
        
        const filteredNotes = this.getFilteredNotes();
        
        if (filteredNotes.length === 0) {
            container.innerHTML = '<div class="empty-state">لا توجد ملاحظات لعرضها</div>';
            return;
        }
        
        filteredNotes.forEach(note => {
            const noteCard = this.createNoteCard(note);
            container.appendChild(noteCard);
        });
    }
    
    getFilteredNotes() {
        if (!this.notes) return [];
        
        if (!this.searchTerm) return this.notes;
        
        return this.notes.filter(note => 
            note.title.toLowerCase().includes(this.searchTerm) ||
            note.content.toLowerCase().includes(this.searchTerm)
        );
    }
    
    filterNotes() {
        this.renderNotes();
    }
    
    renderLectures() {
        const container = document.getElementById('lectures-list');
        if (!container || !this.lectures) return;
        
        container.innerHTML = '';
        
        if (this.lectures.length === 0) {
            container.innerHTML = '<div class="empty-state">لا توجد محاضرات لعرضها</div>';
            return;
        }
        
        this.lectures.forEach(lecture => {
            const lectureCard = this.createLectureCard(lecture);
            container.appendChild(lectureCard);
        });
    }
    
    renderProjects() {
        const pendingContainer = document.getElementById('pending-projects');
        const progressContainer = document.getElementById('progress-projects');
        const completedContainer = document.getElementById('completed-projects');
        
        if (!pendingContainer || !progressContainer || !completedContainer || !this.projects) return;
        
        // تنظيف الحاويات
        pendingContainer.innerHTML = '';
        progressContainer.innerHTML = '';
        completedContainer.innerHTML = '';
        
        // توزيع المشاريع حسب الحالة
        this.projects.forEach(project => {
            const projectCard = this.createProjectCard(project);
            
            switch (project.status) {
                case 'pending':
                    pendingContainer.appendChild(projectCard);
                    break;
                case 'in_progress':
                    progressContainer.appendChild(projectCard);
                    break;
                case 'completed':
                    completedContainer.appendChild(projectCard);
                    break;
            }
        });
        
        // إضافة رسائل فارغة إذا لزم الأمر
        if (pendingContainer.children.length === 0) {
            pendingContainer.innerHTML = '<div class="empty-column">لا توجد مشاريع في الانتظار</div>';
        }
        if (progressContainer.children.length === 0) {
            progressContainer.innerHTML = '<div class="empty-column">لا توجد مشاريع قيد التنفيذ</div>';
        }
        if (completedContainer.children.length === 0) {
            completedContainer.innerHTML = '<div class="empty-column">لا توجد مشاريع مكتملة</div>';
        }
    }
    
    renderCalendar() {
        const calendar = document.getElementById('calendar');
        const monthTitle = document.getElementById('currentMonth');
        
        if (!calendar || !monthTitle) return;
        
        // تحديث عنوان الشهر
        const monthNames = [
            'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
            'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
        ];
        
        monthTitle.textContent = `${monthNames[this.currentMonth.getMonth()]} ${this.currentMonth.getFullYear()}`;
        
        // إنشاء التقويم
        calendar.innerHTML = '';
        
        // أيام الأسبوع
        const weekDays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        weekDays.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            calendar.appendChild(dayHeader);
        });
        
        // الحصول على أول يوم في الشهر
        const firstDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
        const lastDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        // إنشاء أيام التقويم
        const today = new Date();
        for (let i = 0; i < 42; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = currentDate.getDate();
            
            // تحديد الفئات
            if (currentDate.getMonth() !== this.currentMonth.getMonth()) {
                dayElement.classList.add('other-month');
            }
            
            if (currentDate.toDateString() === today.toDateString()) {
                dayElement.classList.add('today');
            }
            
            // التحقق من وجود محاضرات في هذا اليوم
            if (this.lectures) {
                const hasLecture = this.lectures.some(lecture => {
                    if (!lecture.lecture_date) return false;
                    const lectureDate = new Date(lecture.lecture_date);
                    return lectureDate.toDateString() === currentDate.toDateString();
                });
                
                if (hasLecture) {
                    dayElement.classList.add('has-lecture');
                }
            }
            
            calendar.appendChild(dayElement);
        }
    }
    
    createTodoCard(todo) {
        const card = document.createElement('div');
        card.className = `item-card fade-in ${todo.completed ? 'completed' : ''}`;
        
        card.innerHTML = `
            <div class="item-header">
                <div>
                    <h3 class="item-title">${this.escapeHtml(todo.title)}</h3>
                    <span class="item-status ${todo.completed ? 'status-completed' : 'status-pending'}">
                        ${todo.completed ? '✅ مكتملة' : '⏳ في الانتظار'}
                    </span>
                </div>
                <div class="item-actions">
                    <button class="action-btn edit-btn" onclick="dashboard.editItem('todo', ${todo.id})" title="تعديل">
                        ✏️
                    </button>
                    <button class="action-btn toggle-btn" onclick="dashboard.toggleTodo(${todo.id}, ${!todo.completed})" title="${todo.completed ? 'إلغاء الإكمال' : 'وضع علامة كمكتملة'}">
                        ${todo.completed ? '↩️' : '✅'}
                    </button>
                    <button class="action-btn delete-btn" onclick="dashboard.deleteItem('todo', ${todo.id})" title="حذف">
                        🗑️
                    </button>
                </div>
            </div>
            ${todo.description ? `<p class="item-description">${this.escapeHtml(todo.description)}</p>` : ''}
            <div class="item-date">📅 ${this.formatDate(todo.created_at)}</div>
        `;
        
        return card;
    }
    
    createNoteCard(note) {
        const card = document.createElement('div');
        card.className = 'item-card fade-in';
        
        card.innerHTML = `
            <div class="item-header">
                <h3 class="item-title">${this.escapeHtml(note.title)}</h3>
                <div class="item-actions">
                    <button class="action-btn edit-btn" onclick="dashboard.editItem('note', ${note.id})" title="تعديل">
                        ✏️
                    </button>
                    <button class="action-btn delete-btn" onclick="dashboard.deleteItem('note', ${note.id})" title="حذف">
                        🗑️
                    </button>
                </div>
            </div>
            <p class="item-description">${this.escapeHtml(note.content).substring(0, 150)}${note.content.length > 150 ? '...' : ''}</p>
            <div class="item-date">📅 ${this.formatDate(note.created_at)}</div>
        `;
        
        return card;
    }
    
    createLectureCard(lecture) {
        const card = document.createElement('div');
        card.className = 'item-card fade-in';
        
        card.innerHTML = `
            <div class="item-header">
                <h3 class="item-title">${this.escapeHtml(lecture.title)}</h3>
                <div class="item-actions">
                    <button class="action-btn edit-btn" onclick="dashboard.editItem('lecture', ${lecture.id})" title="تعديل">
                        ✏️
                    </button>
                    <button class="action-btn delete-btn" onclick="dashboard.deleteItem('lecture', ${lecture.id})" title="حذف">
                        🗑️
                    </button>
                </div>
            </div>
            ${lecture.description ? `<p class="item-description">${this.escapeHtml(lecture.description)}</p>` : ''}
            ${lecture.lecture_date ? `<div class="item-date">🗓️ ${this.formatDate(lecture.lecture_date)}</div>` : ''}
            <div class="item-date">📅 ${this.formatDate(lecture.created_at)}</div>
        `;
        
        return card;
    }
    
    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'item-card fade-in';
        
        const statusMap = {
            'pending': { class: 'status-pending', text: '⏳ في الانتظار', icon: '📋' },
            'in_progress': { class: 'status-in-progress', text: '🔄 قيد التنفيذ', icon: '⚡' },
            'completed': { class: 'status-completed', text: '✅ مكتمل', icon: '🎉' }
        };
        
        const status = statusMap[project.status] || statusMap['pending'];
        
        card.innerHTML = `
            <div class="item-header">
                <div>
                    <h3 class="item-title">${this.escapeHtml(project.title)}</h3>
                    <span class="item-status ${status.class}">${status.text}</span>
                </div>
                <div class="item-actions">
                    <button class="action-btn edit-btn" onclick="dashboard.editItem('project', ${project.id})" title="تعديل">
                        ✏️
                    </button>
                    <button class="action-btn delete-btn" onclick="dashboard.deleteItem('project', ${project.id})" title="حذف">
                        🗑️
                    </button>
                </div>
            </div>
            ${project.description ? `<p class="item-description">${this.escapeHtml(project.description)}</p>` : ''}
            <div class="item-date">📅 ${this.formatDate(project.created_at)}</div>
        `;
        
        return card;
    }
    
    updateDashboardStats() {
        if (this.todos) {
            document.getElementById('totalTodos').textContent = this.todos.length;
        }
        if (this.notes) {
            document.getElementById('totalNotes').textContent = this.notes.length;
        }
        if (this.lectures) {
            document.getElementById('totalLectures').textContent = this.lectures.length;
        }
        if (this.projects) {
            document.getElementById('totalProjects').textContent = this.projects.length;
        }
    }
    
    loadRecentActivities() {
        const container = document.getElementById('recentActivities');
        if (!container) return;
        
        const activities = [];
        
        // إضافة المهام الحديثة
        if (this.todos) {
            this.todos.slice(0, 3).forEach(todo => {
                activities.push({
                    icon: '✅',
                    text: `تم إضافة المهمة: ${todo.title}`,
                    time: this.getRelativeTime(todo.created_at),
                    type: 'todo'
                });
            });
        }
        
        // إضافة الملاحظات الحديثة
        if (this.notes) {
            this.notes.slice(0, 2).forEach(note => {
                activities.push({
                    icon: '📝',
                    text: `تم إضافة الملاحظة: ${note.title}`,
                    time: this.getRelativeTime(note.created_at),
                    type: 'note'
                });
            });
        }
        
        // ترتيب الأنشطة حسب التاريخ
        activities.sort((a, b) => new Date(b.time) - new Date(a.time));
        
        if (activities.length === 0) {
            container.innerHTML = '<div class="empty-state">لا توجد أنشطة حديثة</div>';
            return;
        }
        
        container.innerHTML = activities.slice(0, 5).map(activity => `
            <div class="activity-item">
                <div class="activity-icon">${activity.icon}</div>
                <div class="activity-text">${activity.text}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `).join('');
    }
    
    openModal(type, item = null) {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');
        const formFields = document.getElementById('form-fields');
        
        this.currentEditType = type;
        this.currentEditId = item ? item.id : null;
        
        const titles = {
            'todo': item ? 'تعديل المهمة' : 'إضافة مهمة جديدة',
            'note': item ? 'تعديل الملاحظة' : 'إضافة ملاحظة جديدة',
            'lecture': item ? 'تعديل المحاضرة' : 'إضافة محاضرة جديدة',
            'project': item ? 'تعديل المشروع' : 'إضافة مشروع جديد'
        };
        
        modalTitle.textContent = titles[type];
        formFields.innerHTML = this.getFormFields(type, item);
        
        modal.classList.remove('hidden');
        
        // التركيز على أول حقل
        const firstInput = formFields.querySelector('input, textarea');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
    
    getFormFields(type, item = null) {
        let fields = '';
        
        switch (type) {
            case 'todo':
                fields = `
                    <div class="form-group">
                        <label for="title">عنوان المهمة *</label>
                        <input type="text" id="title" name="title" value="${item ? this.escapeHtml(item.title) : ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="description">الوصف</label>
                        <textarea id="description" name="description" rows="3" placeholder="وصف اختياري للمهمة...">${item ? this.escapeHtml(item.description || '') : ''}</textarea>
                    </div>
                `;
                break;
                
            case 'note':
                fields = `
                    <div class="form-group">
                        <label for="title">عنوان الملاحظة *</label>
                        <input type="text" id="title" name="title" value="${item ? this.escapeHtml(item.title) : ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="content">المحتوى *</label>
                        <textarea id="content" name="content" rows="6" placeholder="اكتب محتوى الملاحظة هنا..." required>${item ? this.escapeHtml(item.content || '') : ''}</textarea>
                    </div>
                `;
                break;
                
            case 'lecture':
                fields = `
                    <div class="form-group">
                        <label for="title">عنوان المحاضرة *</label>
                        <input type="text" id="title" name="title" value="${item ? this.escapeHtml(item.title) : ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="description">الوصف</label>
                        <textarea id="description" name="description" rows="3" placeholder="وصف اختياري للمحاضرة...">${item ? this.escapeHtml(item.description || '') : ''}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="lecture_date">تاريخ المحاضرة</label>
                        <input type="date" id="lecture_date" name="lecture_date" value="${item ? (item.lecture_date || '') : ''}">
                    </div>
                `;
                break;
                
            case 'project':
                const statuses = [
                    { value: 'pending', text: 'في الانتظار' },
                    { value: 'in_progress', text: 'قيد التنفيذ' },
                    { value: 'completed', text: 'مكتمل' }
                ];
                
                const statusOptions = statuses.map(status => 
                    `<option value="${status.value}" ${item && item.status === status.value ? 'selected' : ''}>${status.text}</option>`
                ).join('');
                
                fields = `
                    <div class="form-group">
                        <label for="title">عنوان المشروع *</label>
                        <input type="text" id="title" name="title" value="${item ? this.escapeHtml(item.title) : ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="description">الوصف</label>
                        <textarea id="description" name="description" rows="3" placeholder="وصف اختياري للمشروع...">${item ? this.escapeHtml(item.description || '') : ''}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="status">الحالة</label>
                        <select id="status" name="status">
                            ${statusOptions}
                        </select>
                    </div>
                `;
                break;
        }
        
        return fields;
    }
    
    closeModal() {
        document.getElementById('modal').classList.add('hidden');
        this.currentEditId = null;
        this.currentEditType = null;
    }
    
    async handleSave(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value.trim();
        }
        
        // التحقق من البيانات المطلوبة
        if (!data.title) {
            this.showMessage('يرجى إدخال العنوان', 'error');
            return;
        }
        
        if (this.currentEditType === 'note' && !data.content) {
            this.showMessage('يرجى إدخال المحتوى', 'error');
            return;
        }
        
        try {
            const url = this.currentEditId 
                ? `api/${this.currentEditType}s.php?action=update&id=${this.currentEditId}`
                : `api/${this.currentEditType}s.php?action=create`;
                
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.showMessage(result.message, 'success');
                this.closeModal();
                await this.loadAllData();
                this.updateDashboardStats();
            } else {
                this.showMessage(result.message, 'error');
            }
        } catch (error) {
            this.showMessage('حدث خطأ في الحفظ', 'error');
            console.error('Save error:', error);
        }
    }
    
    async editItem(type, id) {
        try {
            const response = await fetch(`api/${type}s.php?action=get&id=${id}`);
            const result = await response.json();
            
            if (result.success) {
                this.openModal(type, result.data);
            } else {
                this.showMessage('لم يتم العثور على العنصر', 'error');
            }
        } catch (error) {
            this.showMessage('حدث خطأ في جلب البيانات', 'error');
            console.error('Edit error:', error);
        }
    }
    
    async deleteItem(type, id) {
        if (!confirm('هل أنت متأكد من الحذف؟ لا يمكن التراجع عن هذا الإجراء.')) {
            return;
        }
        
        try {
            const response = await fetch(`api/${type}s.php?action=delete&id=${id}`, {
                method: 'DELETE'
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.showMessage(result.message, 'success');
                await this.loadAllData();
                this.updateDashboardStats();
            } else {
                this.showMessage(result.message, 'error');
            }
        } catch (error) {
            this.showMessage('حدث خطأ في الحذف', 'error');
            console.error('Delete error:', error);
        }
    }
    
    async toggleTodo(id, completed) {
        try {
            const response = await fetch(`api/todos.php?action=toggle&id=${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed })
            });
            
            const result = await response.json();
            
            if (result.success) {
                await this.loadTodos();
                this.updateDashboardStats();
                this.showMessage(completed ? 'تم وضع علامة كمكتملة' : 'تم إلغاء الإكمال', 'success');
            } else {
                this.showMessage(result.message, 'error');
            }
        } catch (error) {
            this.showMessage('حدث خطأ في تحديث الحالة', 'error');
            console.error('Toggle error:', error);
        }
    }
    
    showMessage(message, type) {
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.className = `message ${type}`;
            messageElement.classList.remove('hidden');
            
            setTimeout(() => {
                messageElement.classList.add('hidden');
            }, 5000);
        }
    }
    
    // دوال مساعدة
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    getRelativeTime(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
        
        if (diffInHours < 1) return 'منذ قليل';
        if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
        
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `منذ ${diffInDays} يوم`;
        
        return this.formatDate(dateString);
    }
}

// جعل المدير متاحاً عالمياً
let dashboard;

document.addEventListener('DOMContentLoaded', () => {
    dashboard = new DashboardManager();
});

// إضافة دالة إغلاق النافذة المنبثقة
function closeModal() {
    if (dashboard) {
        dashboard.closeModal();
    }
}