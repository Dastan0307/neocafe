import styles from './profile.module.scss'

const WorkSchedule = () => {
  return (
    <div className={styles.work_schedule}>
      <div className={styles.working_hours}>
        <div className={styles.working_day}>
          <span className={styles.circle}></span>
          <p className={styles.title}>Рабочий день</p>
        </div>
        <div className={styles.weekend}>
          <span className={styles.circle_weekend}></span>
          <p className={styles.title}>Выходной</p>
        </div>
      </div>
      <div className={styles.name__day}>
        <p>Пн</p>
        <p>Вт</p>
        <p>Ср</p>
        <p>Чт</p>
        <p>Пт</p>
        <p>Сб</p>
        <p>Вс</p>
      </div>
      <div className={styles.schedule__days_number}>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p className={styles.specific_number}>6</p>
        <p className={styles.specific_number_mr}>7</p>
        <p>8</p>
        <p>9</p>
        <p>10</p>
        <p>11</p>
        <p>12</p>
        <p className={styles.specific_number}>13</p>
        <p className={styles.specific_number_mr}>14</p>
        <p>15</p>
        <p>16</p>
        <p>17</p>
        <p>18</p>
        <p>19</p>
        <p className={styles.specific_number}>20</p>
        <p className={styles.specific_number_mr}>21</p>
        <p>22</p>
        <p>23</p>
        <p>24</p>
        <p>25</p>
        <p>26</p>
        <p className={styles.specific_number}>27</p>
        <p className={styles.specific_number_mr}>28</p>
        <p>29</p>
        <p>30</p>
        <p>31</p>
        <p className={styles.last_numbers}>1</p>
        <p className={styles.last_numbers}>2</p>
        <p className={styles.specific_number_bg}>3</p>
        <p className={styles.specific_number_mr_bg}>4</p>
      </div>
    </div>
  )
}

export default WorkSchedule
